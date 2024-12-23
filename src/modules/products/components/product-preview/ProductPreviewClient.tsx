// ProductPreviewClient.tsx (Client-side)
"use client" // Mark this as a client component

import React, { useState } from "react"
import ProductActions from "@modules/products/components/product-actions"
import Modal from "./Modal"

interface ProductPreviewClientProps {
  product: any
  region: any
}

const ProductPreviewClient: React.FC<ProductPreviewClientProps> = ({ product, region }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={openModal}>Show Product Actions</button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} product={product} region={region} />
    </div>
  )
}

export default ProductPreviewClient
