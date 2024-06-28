"use client";
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import audio from "../../../../app/audio.png";
import powerbank from "../../../../app/powerbank.png";
import cables from "../../../../app/cable.png";
import chargers from "../../../../app/chargers.png";
import bags from "../../../../app/bag.png";
import watches from "../../../../app/watches.png";
import holders from "../../../../app/14.png";
import plug from "../../../../app/chargers.png"
interface Swiperz2Props {
  iconName: string;
}

const iconMap: { [key: string]: StaticImageData } = {
  audio,
  powerbank,
  cables,
  plug,
  holders,
  chargers,
  bags,
  watches,
};

const IconsSideMenu: React.FC<Swiperz2Props> = ({ iconName }) => {
  const iconSrc = iconMap[iconName];

  if (!iconSrc) {
    return null; // Return null or a default image if the iconName doesn't match any keys
  }

  return <Image src={iconSrc} alt={iconName} height={15} width={20} />;
};

export default IconsSideMenu;
