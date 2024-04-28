import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
     <div className="flex flex-col items-center">
  {price.price_type === "sale" && (
    <Text className="line-through text-ui-fg-muted mb-2 md:mb-0 md:mr-4" data-testid="original-price">
      {price.original_price}
    </Text>
  )}
  <Text
    className={clx(" font-bold text-lg text-red-500", {
      "text-red-500 font-semibold": price.price_type === "sale",
    })}
    data-testid="price"
  >
    {price.calculated_price}
  </Text>
</div>

    </>
  )
}
