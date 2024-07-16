import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProductByHandle,
  getProductsList,
  getRegion,
  listRegions,
  retrievePricedProductById,
} from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params

  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

const getPricedProductByHandle = async (handle: string, region: Region) => {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

export  async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getPricedProductByHandle(params.handle, region)

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}

















export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <LocalizedClientLink href={`/collections/${collection.handle}`}>
         <button type="button" className="focus:outline-none text-white 2xsmall:max-small:text-xs  bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          عرض الكل
          </button>
        </LocalizedClientLink>
        <Text className="text-4xl !text-center font-semibold 2xsmall:max-small:text-lg">{collection.title}</Text>

      </div>
      <ul className="grid 2xsmall:grid-cols-2 xsmall:grid-cols-3 small:max-large:grid-cols-3 large:grid-cols-4 large:gap-x-12 gap-x-6 gap-y-24 small:gap-y-12 xsmall:gap-y-12 2xsmall:gap-y-12 ">
        {products &&
          products.map((product) => (
            <li key={product.id} >
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
                
              />
            </li>
          ))}
      </ul>
      
    </div>
  )
}
