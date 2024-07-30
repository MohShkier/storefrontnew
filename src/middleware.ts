import { Region } from "@medusajs/medusa";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "JO";

const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: 0,
};

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!regionMap.size || regionMapUpdated < Date.now() - 3600 * 1000) {
    const response = await fetch(`${BACKEND_URL}/store/regions`);
    const { regions } = await response.json();

    if (!regions) {
      notFound();
    }

    const newRegionMap = new Map<string, Region>();
    regions.forEach((region: Region) => {
      region.countries.forEach((c) => {
        newRegionMap.set(c.iso_2, region);
      });
    });

    regionMapCache.regionMap = newRegionMap;
    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region>
) {
  try {
    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase();
    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();

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
      return regionMap.keys().next().value;
    }
  } catch (error) {
    console.error(
      "Middleware.ts: Error getting the country code.",
      error
    );
  }
}

export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isOnboarding = searchParams.get("onboarding") === "true";
  const cartId = searchParams.get("cart_id");
  const checkoutStep = searchParams.get("step");
  const onboardingCookie = request.cookies.get("_medusa_onboarding");
  const cartIdCookie = request.cookies.get("_medusa_cart_id");

  const regionMap = await getRegionMap();
  const countryCode = await getCountryCode(request, regionMap);

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode);

  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next();
  }

  let redirectUrl = request.nextUrl.href;
  const redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname;
  const queryString = request.nextUrl.search || "";

  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;
  }

  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`;
    const response = NextResponse.redirect(`${redirectUrl}`, 307);
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 });
    return response;
  }

  if (isOnboarding) {
    const response = NextResponse.redirect(`${redirectUrl}`, 307);
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 });
    return response;
  }

  return NextResponse.redirect(`${redirectUrl}`, 307);
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
