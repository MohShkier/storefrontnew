"use client"
import React, { useState } from 'react';
import { XMark } from "@medusajs/icons";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import './SideMenu.css';
import Divider from '@modules/common/components/divider';
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global"
import { ProductCategoryWithChildren } from "types/global"

import Collapsible from 'react-collapsible';
import IconsSideMenu from './IconsForCategories';
import LogoCollection from './LogoCollection';
import LogoCollections from './LogoCollection';

const SideMenuItems = {
  المحترف: "/",
  المتجر: "/store",
  الحساب: "/account",
  السلة: "/cart",
};
interface Swiperz2Props {
  itemsArray: ProductCollectionWithPreviews[];
  category: ProductCategoryWithChildren[];
}

const SideMenu: React.FC<Swiperz2Props> = ({ itemsArray, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <button onClick={openMenu} className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-gray-600">
          <svg
            className="w-6 h-6 mr-2 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-content">
          <button className="close-btn" onClick={closeMenu}>
            <XMark className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
          <ul className="menu-items text-right">
            {Object.entries(SideMenuItems).map(([name, href]) => (
              <li key={name}>
                <LocalizedClientLink
                  href={href}
                  className="text-lg leading-8 hover:!text-red-500 !text-black"
                  onClick={closeMenu}
                >
                  {name}
                </LocalizedClientLink>
              </li>
            ))}
            <Divider className='pt-3' />
            {itemsArray.map((c) => {
              return (
                <LocalizedClientLink key={c.handle} href={"/collections/" + c.handle} className='hover:!text-red-500'>
                  <div>
                    <h1 className='pt-3 pb-3 text-center'>{c.title}</h1>
                    <Divider className=''/>
                  </div>
                </LocalizedClientLink>
              );
            })}
            <Divider />
            <div className='pt-6'>
              {category.map((c) => (
                <>
                  {c.category_children.length >= 1 && (
                    <div className='!text-center !me-7'>
                      {c.category_children.map((c2) => (
                        <LocalizedClientLink
                          key={c2.handle}
                          href={`/categories/${c2.handle}`}
                          className='hover:text-red-500 hover:cursor-pointer !text-black'
                        >
                          <div className='flex flex-row gap-3 pt-5 '>
                            <IconsSideMenu iconName={c2.handle} />
                            <h1 className='hover:text-red-500 hover:cursor-pointer '>{c2.name}</h1>
                          </div>
                          <Divider className='pt-3'/>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  )}
                </>
              ))}
              {category.map((c) => (
                <>
                  <div className='flex justify-center !text-center'>
                    {(c.category_children.length < 1 && !c.parent_category) && <h1 className='hover:text-red-500 hover:cursor-pointer pt-3'>{c.name}</h1>}
                  </div>
                </>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
