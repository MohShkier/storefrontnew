"use client"
import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper"
import "./styles.css"
import   { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image"
import myImage from "../../../../../../almohtaref-mobile/uploads/1705936120_0d1772b28c769aedcc47.jpg"

SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, A11y]);

interface SwiperProps {
    classAdded: string;
}

const Swiperz: React.FC<SwiperProps> = ({ classAdded }) => {
    return (
        <>
        <Swiper
            className={classAdded + "Sswiper  mt-10  small:max-lg:!h-[10rem] 2xsmall:max-small:!w-full"}
            spaceBetween={100}
            autoplay={{

                delay: 2500,
                disableOnInteraction: true,
            }}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
<SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src="https://i.ibb.co/6ZLwHnh/slider1.jpg"
          width={500}
          height={500}
          loader={({ src }) => src}
        />
      </SwiperSlide>
      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src="https://i.ibb.co/6ZLwHnh/slider2.jpg"
          width={500}
          height={500}
          loader={({ src }) => src}
        />
      </SwiperSlide>
      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src="https://i.ibb.co/6ZLwHnh/slider3.jpg"
          width={500}
          height={500}
          loader={({ src }) => src}
        />
      </SwiperSlide>
      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src="https://i.ibb.co/6ZLwHnh/slider3.jpg"
          width={500}
          height={500}
          loader={({ src }) => src}
        />
      </SwiperSlide>

      
        </Swiper>



        </>
    );
}

export default Swiperz;
