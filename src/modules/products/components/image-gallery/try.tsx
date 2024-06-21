"use client";
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";
import "./styles.css";

SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, A11y]);

interface MedusaImage {
  url: string;
  alt?: string;
  id: string;
}

interface Props {
  images: MedusaImage[];
}

const ImageComponent: React.FC<Props> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center justify-items-center">
      <div className="relative mb-4 custom-main-image-container">
        <img
          src={images[selectedImageIndex].url}
          alt={`Product image ${selectedImageIndex + 1}`}
          width={600}
          height={600}
          className="custom-rounded object-cover"
        />
      </div>

      <Swiper
        className="custom-image-swiper sm:max-lg:max-w-[26rem] max-w-[30rem] !w-full !h-full hover:cursor-pointer"
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        pagination={{ el: '.custom-swiper-pagination', clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev'
        }}
        breakpoints={{
          310: { slidesPerView: 2 },
          510: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} onClick={() => handleImageClick(index)}>
            <img
              src={image.url}
              alt={`Product image ${index + 1}`}
              className="custom-rounded-thumb"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-button-prev swiper-button-prev"></div>
      <div className="custom-swiper-button-next swiper-button-next"></div>
      <div className="custom-swiper-pagination !mt-10"></div>
    </div>
  );
};

export default ImageComponent;
