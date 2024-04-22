import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
     <div className="flex flex-col md:flex-row md:items-center">
  {price.price_type === "sale" && (
    <Text className="line-through text-ui-fg-muted mb-2 md:mb-0 md:mr-4" data-testid="original-price">
      {price.original_price}
    </Text>
  )}
  <Text
    className={clx("text-ui-fg-muted", {
      "text-orange-500": price.price_type === "sale",
    })}
    data-testid="price"
  >
    {price.calculated_price}
  </Text>
</div>

    </>
  )
}
