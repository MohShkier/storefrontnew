// ProductPreview.tsx (Server-side)
import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import ProductPreviewClient from "./ProductPreviewClient" // Client-side component
import { ProductPreviewType } from "types/global"


export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <div data-testid="product-wrapper">
      <LocalizedClientLink href={`/products/${productPreview.handle}`} className="group">
        <Thumbnail thumbnail={productPreview.thumbnail} size="square" isFeatured={isFeatured} />
      </LocalizedClientLink>
      <div className="flex flex-col mt-4 md:justify-between items-center">
        <div>
          <h2>{productPreview.title}</h2>
        </div>
        <div className="flex items-center mt-2 md:mt-0 text-center">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>

      {/* Pass the product and region to the client-side component */}
      <ProductPreviewClient product={pricedProduct} region={region} />
    </div>
  )
}
