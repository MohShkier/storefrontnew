import { Region } from "@medusajs/medusa";
import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import fetch from 'node-fetch'; // Import node-fetch v2 for compatibility

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "JO";

const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: 0,
};

// Helper to fetch regions and cache them
async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache;

  // Refresh the cache if it's empty or older than an hour
  if (!regionMap.size || regionMapUpdated < Date.now() - 3600 * 1000) {
    try {
      const response = await fetch(`${BACKEND_URL}/store/regions`);
      if (!response.ok) {
        throw new Error(`Failed to fetch regions: ${response.statusText}`);
      }
      const { regions } = await response.json();

      if (!regions) {
        notFound(); // Handle if no regions are found
      }

      const newRegionMap = new Map<string, Region>();
      regions.forEach((region: Region) => {
        region.countries.forEach((c) => {
          newRegionMap.set(c.iso_2, region); // Cache country code to region mapping
        });
      });

      regionMapCache.regionMap = newRegionMap;
      regionMapCache.regionMapUpdated = Date.now(); // Update cache timestamp
    } catch (error) {
      console.error("Error fetching region map:", error);
      throw error; // Re-throw error to handle it upstream
    }
  }

  return regionMapCache.regionMap;
}

// Helper to determine country code from the request
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region>
) {
  try {
    const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase(); // Get country from header (if available)
    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();

    // Prioritize URL, then Vercel header, then default
    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      return urlCountryCode;
    }
    if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      return vercelCountryCode;
    }
    if (regionMap.has(DEFAULT_REGION)) {
      return DEFAULT_REGION;
    }
    if (regionMap.size) {
      return regionMap.keys().next().value; // Default to first available region
    }
  } catch (error) {
    console.error("Error getting the country code:", error);
  }
}

// Main middleware function
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isOnboarding = searchParams.get("onboarding") === "true";
  const cartId = searchParams.get("cart_id");
  const checkoutStep = searchParams.get("step");
  const onboardingCookie = request.cookies.get("_medusa_onboarding");
  const cartIdCookie = request.cookies.get("_medusa_cart_id");

  // Get region map and country code
  const regionMap = await getRegionMap();
  const countryCode = await getCountryCode(request, regionMap);

  // Check if URL contains country code
  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode);

  // Handle redirections based on country code and other conditions
  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next(); // Allow request to proceed
  }

  // Prepare redirect URL if necessary
  let redirectUrl = request.nextUrl.href;
  const redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname;
  const queryString = request.nextUrl.search || "";

  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;
  }

  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`; // Add step to address in URL
    const response = NextResponse.redirect(`${redirectUrl}`, 307);
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 });
    return response;
  }

  if (isOnboarding) {
    const response = NextResponse.redirect(`${redirectUrl}`, 307);
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 });
    return response;
  }

  return NextResponse.redirect(`${redirectUrl}`, 307); // Redirect to proper URL
}

// Middleware config
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"], // Apply to all routes except API, static files, and favicon
};
