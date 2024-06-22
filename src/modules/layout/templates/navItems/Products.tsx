"use client"
import { MedusaProvider, useMedusa, useProducts } from "medusa-react"
import { QueryClient } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()


const ProductsList = () => {
  // useMedusa is used within MedusaProvider
  const { client } = useMedusa()

  const { products, isLoading } = useProducts()

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {products && !products.length && <span>No Products</span>}
      {products && products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
const Products = () => {
    return (
      <MedusaProvider
        queryClientProviderProps={{ client: queryClient }}
        baseUrl="http://localhost:8000"
      >
        <ProductsList />
      </MedusaProvider>
    )
  }
  
export default Products
