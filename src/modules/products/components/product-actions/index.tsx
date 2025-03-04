"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  onClose?: () => void
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
  onClose,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)

  const countryCode = useParams().countryCode as string

  const variants = (product as any).pricedDetails?.variants || (product as PricedProduct).variants;

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v:any) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false
    }

    if (variant && variant.allow_backorder === false) {
      return true
    }
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)

    // Display the toast notification
    toast(
      <div>
        Product added to cart! <br />
        <a href="/cart" target="_blank" rel="noopener noreferrer" className="text-red-500">Go to cart</a>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }



  const productVariants = 
  (product as any)?.pricedDetails?.variants 
    ? (product as any).pricedDetails.variants 
    : (product as PricedProduct).variants;

const productOptions =
  (product as any)?.pricedDetails?.options
    ? (product as any).pricedDetails.options
    : (product as PricedProduct).options;



  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
        {(productVariants?.length ?? 0) > 1 && (
  <div className="flex flex-col gap-y-4">
    {(productOptions ?? []).map((option: any) => {
      return (
        <div key={option.id}>
          <OptionSelect
            option={option}
            current={options[option.id]}
            updateOption={updateOptions}
            title={option.title}
            data-testid="product-options"
          />
        </div>
      )
    })}
    <Divider />
  </div>
)}
        </div>

        <ProductPrice product={product} variant={variant} region={region} />

        <Button
  onClick={async () => {
    try {
      await handleAddToCart(); // Wait for handleAddToCart to finish
      
      // Wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      onClose?.(); // Call onClose if it's defined
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }}
  disabled={!inStock || !variant}
  variant="primary"
  className="w-full h-10"
  isLoading={isAdding}
  data-testid="add-product-button"
>
  {!variant
    ? "اختر المواصفات"
    : !inStock
    ? "نفذ من المخزون"
    : "اضافة الى السلة"}
</Button>

{/*<MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
        /> */}

  
        <ToastContainer />
      </div>
    </>
  )
}
