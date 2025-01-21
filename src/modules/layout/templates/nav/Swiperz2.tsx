"use client";
import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper"
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "./styles.css"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../../../products/components/thumbnail"
import PreviewPrice from "../../../products/components/product-preview/price"
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global"
import DiscountRepository from '@medusajs/medusa/dist/repositories/discount';
import MyCountdownComponent from './test';
import ProductPreviewClient from '@modules/products/components/product-preview/ProductPreviewClient';
import { Region } from '@medusajs/medusa';
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface Swiperz2Props {
  classAdded: string;
  itemsArray: any;
  region:Region;
}

const Swiperz2: React.FC<Swiperz2Props> = ({ classAdded, itemsArray,region}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check if itemsArray is not empty to determine loading state
    if (itemsArray.length > 0) {
      setIsLoading(false);
    }
  }, [itemsArray]);

  return (
    <>
      <div>
        <div className='mt-10'>
          <h2 className='text-center font-bold text-3xl '>الخصومات والعروضة المميزة </h2>
          <MyCountdownComponent/>
        </div>
        <Swiper
          className='animated-swiper mt-10 w-10/12 2xl:w-8/12 2xsmall:max-xsmall:w-10/12'
          spaceBetween={10}
          loop={true}
          centeredSlides={true}
          centerInsufficientSlides={true}
          
          centeredSlidesBounds={true}
          autoplay={false}
          navigation
          breakpoints={{
            310: { slidesPerView: 1 },
            510: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
            1536: { slidesPerView: 3 },
          }}
        >
          
              {itemsArray.map((singleItem:any, productIndex:number) => (
                <>
                  {
                  singleItem.price?.price_type === "sale" && <SwiperSlide key={productIndex}>

                    <div className="relative mb-[3rem] 2xsmall:max-small:mb-8">
                      <div className="absolute  left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-1 px-2 rounded-md z-10 w-[6rem] text-xl font-bold 2xsmall:max-small:w-[4rem] 2xsmall:max-small:text-xs 2xsmall:max-small:mb-2">
                        <span>خصم</span>
                        <span> {- singleItem.price?.difference + "%"}</span>


                      </div>
                    </div>
                    <LocalizedClientLink href={`/products/${singleItem.handle}`} className="group">
                      <div>
                        <Thumbnail thumbnail={singleItem.thumbnail} size="square" />
                        <div className="flex txt-compact-medium mt-4 justify-between flex-col">
                          <Text className="font-semibold text-md" data-testid="product-title">
                            {singleItem.title}
                          </Text>
                          <div className="flex items-center gap-x-2 flex-col text-lg">
                            <div className='line-through'>{singleItem.price?.original_price}</div>
                            {<div className='text-red-500'>{singleItem.price?.calculated_price}</div>}
                          </div>
                        </div>
                      </div>
                    </LocalizedClientLink>
                    <ProductPreviewClient product={singleItem} region={region}/>
                  </SwiperSlide>}


                </>
              ))}
           
        </Swiper>
      </div>
    </>
  );
}

export default Swiperz2;
