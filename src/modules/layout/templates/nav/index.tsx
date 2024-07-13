
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavItems from "@modules/layout/templates/navItems";
import { Product } from "@medusajs/medusa"
import { getCategoriesList, getCollectionsList, getProductsList, getRegion, } from "@lib/data"
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global"
import { cache } from "react"
import shop from "../../../../app/shop.png"
import shopCart from "../../../../app/shopping-cart.png"
import user from "../../../../app/user.png"
import home from "../../../../app/home-page.png"
import logo from "../../../../app/mainlogo.png"
import Image from "next/image";

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 8)

    if (!collections) {
      return null
    }


    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)







export default async function Nav() {
  const collections = await getCollectionsWithProducts("jo")
  const region = await getRegion("jo")
  const categories = await getCategoriesList
  const { product_categories } = await getCategoriesList()
  if (!collections || !region) {
    return null
  }
  const filteredCollections = collections

  return (
    <>
      <>
        <div className="sticky top-0 inset-x-0 z-50 group test">
          <nav className="bg-white shadow-lg border-b-4 border-gray-300 h-[7rem]">
            <div
              className="lg:container p-6 mx-auto lg:px-6 py-4 flex items-center  justify-between xl:justify-around  h-[7rem] relative !w-full">


              <div className="flex items-center justify-center">
                <LocalizedClientLink href="/" className="flex items-center">
                  <Image src={logo} alt="Logo" className="mr-2 h-[7rem]" className="mr-2 h-[7rem]" />
                  <span className="text-gray-800 text-xl font-bold hover:text-orange-500"> المحترف موبايل</span>
                </LocalizedClientLink>
              </div>

              {process.env.FEATURE_SEARCH_ENABLED && (
                    <LocalizedClientLink
                      className="text-gray-800 text-xl font-semibold hover:text-orange-500 2xsmall:max-lg:hidden"
                      href="/search"
                      scroll={false}
                      data-testid="nav-search-link"
                    >

                      <form className="!max-w-5xl mx-auto ">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block md:!w-[30rem] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ما الذي تبحث عنه ؟"
                            required
                          />
                        
                        </div>
                      </form>
                    </LocalizedClientLink>
                  )}

              <div className=" sm:flex items-center space-x-2">
                <div className={"2xsmall:max-xl:hidden xl:flex items-center gap-x-4"}>

                  <LocalizedClientLink
                    href="/"
                    className="text-gray-800 text-xl  font-bold hover:text-orange-500 !ps-5"
                    data-testid="nav-store-link"
                  >
                    <Image src={home} alt="" width={30} height={30}/>
                    </LocalizedClientLink>
                  <LocalizedClientLink
                        className="hover:text-ui-fg-base flex gap-2 text-gray-800 text-xl font-semibold hover:text-orange-500"
                        href="/account"
                    data-testid="nav-account-link"
                  >
                    <Image src={user} alt="" width={30} height={30}/>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/store" className="text-gray-800 text-xl font-semibold hover:text-orange-500">
                  <Image src={shop} alt="" width={30} height={30}/>

                  </LocalizedClientLink>


                  <Suspense
                    fallback={

                      <LocalizedClientLink
                        className="hover:text-ui-fg-base flex gap-2 text-gray-800 text-xl font-semibold hover:text-orange-500"
                        href="/cart"
                        data-testid="nav-cart-link"
                      >
                    <Image src={shopCart} alt="" width={30} height={30}/>
                    </LocalizedClientLink>
                    }
                  >
                    <Image src={shopCart} alt="" width={30} height={30}/>
                    </Suspense>
                </div>
                <div className=" flex-1 basis-0 h-full  items-center">
                  <div className="h-full">
                    <SideMenu itemsArray={collections} category={product_categories} />
                  </div>
                </div>
              </div>

            </div>



          </nav>
        </div>


      </>

    </>
  )
}
