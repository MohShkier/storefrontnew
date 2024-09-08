import { NextRequest, NextResponse } from "next/server"

const FIXED_COUNTRY_CODE = "jo" // Set your fixed country code here
const FIXED_REGION = "Asia" // Set your fixed region name here

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")
  const onboardingCookie = request.cookies.get("_medusa_onboarding")
  const cartIdCookie = request.cookies.get("_medusa_cart_id")

  const urlHasCountryCode =
    request.nextUrl.pathname.split("/")[1]?.toLowerCase() === FIXED_COUNTRY_CODE

  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next()
  }

  let redirectUrl = request.nextUrl.href

  if (!urlHasCountryCode) {
    redirectUrl = `${request.nextUrl.origin}/${FIXED_COUNTRY_CODE}${request.nextUrl.pathname}${request.nextUrl.search}`
    return NextResponse.redirect(redirectUrl, 307)
  }

  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`
    const response = NextResponse.redirect(`${redirectUrl}`, 307)
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
    return response
  }

  if (isOnboarding) {
    const response = NextResponse.redirect(redirectUrl, 307)
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
