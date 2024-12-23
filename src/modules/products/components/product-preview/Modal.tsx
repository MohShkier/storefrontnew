// Modal.tsx
import React from "react"
import ProductActions from "@modules/products/components/product-actions"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
  region: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product, region }) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 min-w-1/2">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col gap-4">
          <h2 className="text-center">اضف الى السلة</h2>
          <hr></hr>
          <ProductActions product={product} region={region} />
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  }
  
  export default Modal
