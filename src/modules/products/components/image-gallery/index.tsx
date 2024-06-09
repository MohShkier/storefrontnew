import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import React from 'react';

import ImageComponent from "./try";
type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-center justify-center relative">
 
    <ImageComponent images={images}/>
    </div>
  )
}

export default ImageGallery
