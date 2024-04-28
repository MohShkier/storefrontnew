"use client"

import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React from "react"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            المجموع
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span data-testid="cart-subtotal">{getAmount(subtotal)}</span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>الخصم</span>
            <span className="text-ui-fg-interactive" data-testid="cart-discount" data-value={getAmount(discount_total)}>
              - {getAmount(discount_total)}
            </span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>كود الهدية</span>
            <span className="text-ui-fg-interactive" data-testid="cart-gift-card-amount" data-value={getAmount(gift_card_total)}>
              - {getAmount(gift_card_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>التوصيل</span>
          <span data-testid="cart-shipping">{getAmount(shipping_total)}</span>
        </div>

      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>المجموع النهائي</span>
        <span className="txt-xlarge-plus" data-testid="cart-taxes">{getAmount(total)}</span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
