"use client";
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import samsungcol from "../../../../app/samsung.png";
import oppo from "../../../../app/oppo.png";
import wiwu from "../../../../app/wiwu.png";
import huawei from "../../../../app/huawei.png";
import tecno from "../../../../app/tecno.png";
import anker from "../../../../app/anker.png";
import apple from "../../../../app/apple.png";
import defaultImage from "../../../../app/apple.png"; // Import a default image
import "./mystyle.css"
interface Swiperz2Props {
  iconName: string;
}

const LogoCollection: { [key: string]: StaticImageData } = {
    samsungcol,
    oppo,
    wiwu,
    huawei,
    tecno,
    anker,
    apple,
};

const LogoCollections: React.FC<Swiperz2Props> = ({ iconName }) => {
  const iconSrc = LogoCollection[iconName] || defaultImage;

  return (
        <>
        <Image src={iconSrc} alt={iconName}  className='testing' width={60}/>
        </>
  )
};

export default LogoCollections;
