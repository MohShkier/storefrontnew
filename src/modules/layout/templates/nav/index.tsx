
import { Suspense } from "react"
import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavItems from "@modules/layout/templates/navItems";
export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
      <>
        <div className="sticky top-0 inset-x-0 z-50 group">
          <nav className="bg-white shadow-lg border-b-4 border-gray-300 h-[7rem]">
            <div
                className="lg:container p-6 mx-auto lg:px-6 py-4 flex items-center justify-between h-[7rem] relative !w-full">


              <div className="flex items-center">
                <LocalizedClientLink href="/" className="flex items-center">
                  <img src="https://i.ibb.co/WgRVZF7/output-onlinepngtools.png" alt="Logo"
                       className="mr-2 h-[7rem]"/>
                  <span className="text-gray-800 text-xl font-bold hover:text-orange-500">Mobile Shop</span>
                </LocalizedClientLink>
              </div>

              <div className=" sm:flex items-center space-x-4">
                <div className={"2xsmall:max-lg:hidden lg:flex items-center space-x-4"}>
                  <LocalizedClientLink
                      href="/"
                      className="text-gray-800 text-xl font-bold hover:text-orange-500"
                      data-testid="nav-store-link"
                  >
                    Home
                  </LocalizedClientLink>
                  <LocalizedClientLink
                      className="text-gray-800 text-xl font-semibold hover:text-orange-500"
                      href="/account"
                      data-testid="nav-account-link"
                  >
                    Account
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/contact" className="text-gray-800 text-xl font-semibold hover:text-orange-500">Contact</LocalizedClientLink>
                  <LocalizedClientLink href="/about" className="text-gray-800 text-xl font-semibold hover:text-orange-500">About</LocalizedClientLink>


                  <Suspense
                      fallback={

                        <LocalizedClientLink
                            className="hover:text-ui-fg-base flex gap-2 text-gray-800 text-xl font-semibold hover:text-orange-500"
                            href="/cart"
                            data-testid="nav-cart-link"
                        >
                          Cart (0)
                        </LocalizedClientLink>
                      }
                  >
                    <CartButton/>
                  </Suspense>
                </div>
                <div className="lg:hidden flex-1 basis-0 h-full  items-center">
                  <div className="h-full">
                    <SideMenu regions={regions}/>
                  </div>
                </div>
              </div>

            </div>


            <div className="hidden small:flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && (
                    <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href="/search"
                        scroll={false}
                        data-testid="nav-search-link"
                    >
                      Search
                    </LocalizedClientLink>
                )}

              </div>

            </div>
          </nav>
        </div>

        <NavItems/>

      </>
  )
}
