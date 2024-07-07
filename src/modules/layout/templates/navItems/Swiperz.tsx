"use client";
import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import "./styles.css";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";
import swiper9 from "../../../../app/slider9.jpeg";
import swiper10 from "../../../../app/slider10.jpeg";
import swiper11 from "../../../../app/mahmoudimage.jpeg";
import swiper12 from "../../../../app/تصميم رالموقع-01.jpg";
import swiper13 from "../../../../app/تصميم رالموقع-03.jpg";
import swiper14 from "../../../../app/تصميم رالموقع-02.jpg";
import swiper125 from "../../../../app/تصميم رالموقع-05.jpg";

SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, A11y]);

interface SwiperProps {
    classAdded: string;
}

const Swiperz: React.FC<SwiperProps> = ({ classAdded }) => {
    return (
        <>
            <Swiper
                className={`${classAdded} custom-swiper    mt-10 rounded-3xl small:max-lg:!h-[10rem]`}
                spaceBetween={100}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                slidesPerView={1}
                navigation
                pagination={{
                    el: '.custom-swiper-pagination1',
                    clickable: true
                }}
            >
                <SwiperSlide className='custom-swiper-slide'>
                    <Image
                        alt=""
                        className='custom-swiper-slide-img rounded-3xl'
                        src={swiper9}
                        loader={({ src }) => src}
                    />
                </SwiperSlide>
                <SwiperSlide className='custom-swiper-slide'>
                    <Image
                        alt=""
                        className='custom-swiper-slide-img rounded-3xl'
                        src={swiper10}
                        loader={({ src }) => src}
                    />
                </SwiperSlide>
                <SwiperSlide className='custom-swiper-slide'>
                    <Image
                        alt=""
                        className='custom-swiper-slide-img rounded-3xl'
                        src={swiper11}
                        loader={({ src }) => src}
                    />
                </SwiperSlide>
     
                <SwiperSlide className='custom-swiper-slide'>
                    <Image
                        alt=""
                        className='custom-swiper-slide-img rounded-3xl'
                        src={swiper13}
                        loader={({ src }) => src}
                    />
                </SwiperSlide>
                <SwiperSlide className='custom-swiper-slide'>
                    <Image
                        alt=""
                        className='custom-swiper-slide-img rounded-3xl'
                        src={swiper125}
                        loader={({ src }) => src}
                    />
                </SwiperSlide>


                <div className="custom-swiper-pagination1"></div>
            </Swiper>
        </>
    );
}

export default Swiperz;
