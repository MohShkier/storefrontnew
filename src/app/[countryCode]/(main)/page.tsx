import { Product } from "@medusajs/medusa"
import { Metadata } from "next"
import { getCategoriesList, getCollectionsList, getProductsList, getRegion, } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews, ProductPreviewType  } from "types/global"
import { cache } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { getEnabledCategories } from "trace_events"
import { useProductCategory } from "medusa-react"
import Swiperz from "@modules/layout/templates/navItems/Swiperz"
import Swiperz2 from "@modules/layout/templates/nav/Swiperz2"
import Image from 'next/image';
import Head from 'next/head';
import Logo from "../../mainlogo.png";

export const metadata: Metadata = {
  title: "المحترف موبايل",
  description:
    "المحترف موبايل ، اكبر معرض في شرق عمان للأجهزة الخلوية واكسسواراتها",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 30)

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

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const categories = await getCategoriesList
  const { product_categories } = await getCategoriesList()
  if (!collections || !region) {
    return null
  }
  const filteredCollections = collections

  return (
    <>
       <Head>
        <title>المحترف موبايل</title>
        <meta name="description" content={"المحترف موبايل ، اكبر معرض في شرق عمان للأجهزة الخلوية واكسسواراتها "} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={"المحترف موبايل"} />
        <meta property="og:description" content={"المحترف موبايل ، اكبر معرض في شرق عمان للأجهزة الخلوية واكسسواراتها "} />
        <meta property="og:image" content={Logo} />
        <meta property="og:url" content={`https://mohtaref.pro/jo/} />
        <meta property="og:type" content="product" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"المحترف موبايل"} />
        <meta name="twitter:description" content={"المحترف موبايل ، اكبر معرض في شرق عمان للأجهزة الخلوية واكسسواراتها "} />
        <meta name="twitter:image" content={Logo} />
      </Head>
                <Swiperz classAdded=""/>
      <Hero />
      <div className="py-12">
  


        <ul className="flex flex-col gap-x-6 test"  >
          
          <FeaturedProducts collections={collections} region={region} />
        </ul>

      </div>

     
    </>
  )
}
