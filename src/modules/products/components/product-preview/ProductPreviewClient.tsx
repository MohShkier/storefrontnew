// ProductPreviewClient.tsx (Client-side)
"use client" // Mark this as a client component

import React, { useState } from "react"
import ProductActions from "@modules/products/components/product-actions"
import Modal from "./Modal"
import { IoMdCart } from "react-icons/io"

interface ProductPreviewClientProps {
  product: any
  region: any
}

const ProductPreviewClient: React.FC<ProductPreviewClientProps> = ({ product, region }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="">
      {/* Button to open the modal */}

      {/* Modal Component */}
      <div className="flex justify-center ">
        <div  onClick={openModal} className=" hover:cursor-pointer  bg-red-500 p-1 rounded-b-lg text-white text-center w-4/5 flex gap-1 justify-center ">
          <IoMdCart className="text-2xl  text-white hover:cursor-pointer"  />
              <p className="text-xs md:text-lg">اضف الى السلة</p>

        </div>
        </div>
     
      <Modal isOpen={isModalOpen} onClose={closeModal} product={product} region={region} />
    </div>
  )
}

export default ProductPreviewClient
