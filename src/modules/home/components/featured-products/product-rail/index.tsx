import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"

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
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
         عرض الكل
        </InteractiveLink>
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
