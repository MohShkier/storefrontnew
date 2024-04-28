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
import myImage from "../../../../app/swiperImage.jpg"
import swiper2 from "../../../../app/swiper8.png"
import swiper3 from "../../../../app/swiper2.png"
import swiper4 from "../../../../app/swiper3.png"
import swiper5 from "../../../../app/swiper4.png"
import swiper6 from "../../../../app/swiper5.jpg"
import swiper7 from "../../../../app/swiper6.jpeg"
import swiper8 from "../../../../app/swiper7.png"
SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, A11y]);

interface SwiperProps {
    classAdded: string;
}

const Swiperz: React.FC<SwiperProps> = ({ classAdded }) => {
    return (
        <>
        <Swiper
            className={classAdded + "Sswiper shadow-lg border-2  mt-10 rounded-3xl small:max-lg:!h-[10rem]"}
            spaceBetween={100}
            autoplay={{

                delay: 2500,
                disableOnInteraction: true,
            }}
            slidesPerView={1}
            navigation
            pagination={{          
              el: '.swiper-pagination',
            clickable: true }}
        >
<SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={myImage}

          loader={({ src }) => src}
        />
      </SwiperSlide>
   
      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper2}

          loader={({ src }) => src}
        />
      </SwiperSlide>

      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper3}

          loader={({ src }) => src}
        />
      </SwiperSlide>

      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper4}

          loader={({ src }) => src}
        />
      </SwiperSlide>

      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper5}

          loader={({ src }) => src}
        />
      </SwiperSlide>


      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper6}
     
          loader={({ src }) => src}
        />
      </SwiperSlide>

      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper7}

          loader={({ src }) => src}
        />
      </SwiperSlide>

      <SwiperSlide className='SwiperSlider'>
        <Image
          alt=""
          className='SwiperSliderImg'
          src={swiper8}

          loader={({ src }) => src}
        />
      </SwiperSlide>

      <div className="swiper-pagination"></div>

        </Swiper>



        </>
    );
}

export default Swiperz;
