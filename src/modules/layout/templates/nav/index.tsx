
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavItems from "@modules/layout/templates/navItems";
import { Product } from "@medusajs/medusa"
import { getCategoriesList, getCollectionsList, getProductsList, getRegion, } from "@lib/data"
import { ProductCollectionWithPreviews, ProductPreviewType  } from "types/global"
import { cache } from "react"


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
                className="lg:container p-6 mx-auto lg:px-6 py-4 flex items-center justify-between h-[7rem] relative !w-full">


              <div className="flex items-center">
                <LocalizedClientLink href="/" className="flex items-center">
                  <img src="https://i.ibb.co/WgRVZF7/output-onlinepngtools.png" alt="Logo"
                       className="mr-2 h-[7rem]"/>
                  <span className="text-gray-800 text-xl font-bold hover:text-orange-500"> المحترف موبايل</span>
                </LocalizedClientLink>
              </div>

              <div className=" sm:flex items-center space-x-4">
                <div className={"2xsmall:max-lg:hidden lg:flex items-center space-x-4"}>
                  <LocalizedClientLink
                      href="/"
                      className="text-gray-800 text-xl  font-bold hover:text-orange-500 !ps-5"
                      data-testid="nav-store-link"
                  >
                    الصفحة الرئيسية
                  </LocalizedClientLink>
                  <LocalizedClientLink
                      className="text-gray-800 text-xl font-semibold hover:text-orange-500 !ps-5"
                      href="/account"
                      data-testid="nav-account-link"
                  >
                    الحساب
                  </LocalizedClientLink>
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
                  <LocalizedClientLink href="/store" className="text-gray-800 text-xl font-semibold hover:text-orange-500">المتجر</LocalizedClientLink>


                  <Suspense
                      fallback={

                        <LocalizedClientLink
                            className="hover:text-ui-fg-base flex gap-2 text-gray-800 text-xl font-semibold hover:text-orange-500"
                            href="/cart"
                            data-testid="nav-cart-link"
                        >
                          السلة (0)
                        </LocalizedClientLink>
                      }
                  >
                    <CartButton/>
                  </Suspense>
                </div>
                <div className=" flex-1 basis-0 h-full  items-center">
                  <div className="h-full">
                  <SideMenu itemsArray={collections} category={product_categories}/>
                  </div>
                </div>
              </div>

            </div>


         
          </nav>
        </div>


      </>
     
    </>
  )}
