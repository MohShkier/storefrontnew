import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "@lib/util/prices"
import { RegionInfo } from "types/global"
import { CalculatedVariant } from "types/medusa"

export function getProductPrice({
  product,
  variantId,
  region,
}: {
  product: PricedProduct
  variantId?: string
  region: RegionInfo
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  // Helper function to calculate the discount percentage
  const getPercentageDiff = (original: number, calculated: number) => {
    const diff = original - calculated
    const decrease = diff / original
    return decrease.toFixed()
  }

  // Safely pick the variants array
  //  - If product.pricedDetails?.variants exists, use it
  //  - otherwise, use product.variants
  //  - default to an empty array if neither is defined
  const getVariants = () => {
    return (
      (product as any)?.pricedDetails?.variants ?? // pricedDetails.variants might exist
      product.variants ?? // fallback
      []
    ) as CalculatedVariant[]
  }

  const cheapestPrice = () => {
    if (!product || !region) {
      return null
    }

    const variants = getVariants()
    if (!variants.length) {
      return null
    }

    // Find the variant with the lowest calculated_price
    const cheapestVariant = variants.reduce((prev, curr) =>
      prev.calculated_price < curr.calculated_price ? prev : curr
    )

    return {
      calculated_price: formatAmount({
        amount: cheapestVariant.calculated_price,
        region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: cheapestVariant.original_price,
        region,
        includeTaxes: false,
      }),
      price_type: cheapestVariant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        cheapestVariant.original_price,
        cheapestVariant.calculated_price
      ),
    }
  }

  const variantPrice = () => {
    if (!product || !region || !variantId) {
      return null
    }

    const variants = getVariants()
    if (!variants.length) {
      return null
    }

    // Safely find the matching variant
    const variant = variants.find(
      (v) => v.id === variantId || v.sku === variantId
    )

    if (!variant) {
      return null
    }

    return {
      calculated_price: formatAmount({
        amount: variant.calculated_price,
        region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: variant.original_price,
        region,
        includeTaxes: false,
      }),
      price_type: variant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        variant.original_price,
        variant.calculated_price
      ),
    }
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
