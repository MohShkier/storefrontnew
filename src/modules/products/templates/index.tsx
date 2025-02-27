import Head from "next/head"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"
import { notFound } from "next/navigation"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* ✅ Add Open Graph Meta Tags */}
      <Head>
        <title>{product.title} | Almohtaref Mobile</title>
        <meta name="description" content={product.description || "Check out thi product."} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description || "Check out this industrial product."} />
        <meta property="og:image" content={product.images?.[0]?.url || "/default-preview.jpg"} />
        <meta property="og:url" content={`https://mohtaref.pro/jo/products/${product.handle}`} />
        <meta property="og:type" content="product" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description || "Check out this industrial product."} />
        <meta name="twitter:image" content={product.images?.[0]?.url || "/default-preview.jpg"} />
      </Head>

      {/* ✅ Existing Product Page Layout */}
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative" data-testid="product-container">
        <div className="flex flex-col gap-y-7 w-full py-8">
          <ProductInfo product={product} />
          <ImageGallery images={product?.images || []} />
        </div>

        <div className="flex flex-col small:max-w-[300px] w-full py-8 gap-y-12">
          <Suspense fallback={<ProductActions product={product} region={region} />}>
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      <div className="content-container my-16 small:my-32" data-testid="related-products-container">
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
