"use client";
import React, { useState, useRef, useEffect } from "react";
import { XMark } from "@medusajs/icons";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import "./SideMenu.css";
import Divider from "@modules/common/components/divider";
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global";
import { ProductCategoryWithChildren } from "types/global";
import IconsSideMenu from "./IconsForCategories";
import CartButton from "../cart-button";

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
  const menuRef = useRef<HTMLDivElement | null>(null);

  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "auto";
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <button onClick={openMenu} className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-gray-600">
          <svg className="w-6 h-6 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

      <div ref={menuRef} className={`sidebar ${isOpen ? "show" : ""}`}>
        <div className="sidebar-content">
          <button className="close-btn" onClick={closeMenu}>
            <XMark className="w-6 h-6 text-gray-600 hover:text-red-500" />
          </button>
          <Divider className="!pt-5" />
          <ul className="menu-items text-right">
            {Object.entries(SideMenuItems).map(([name, href]) => (
              <li key={name}>
                <LocalizedClientLink href={href} className="text-lg leading-8 hover:!text-red-500 !text-black" onClick={closeMenu}>
                  {name}
                </LocalizedClientLink>
              </li>
            ))}
            <Divider className="" />
            {itemsArray.map((c) => (
              <LocalizedClientLink key={c.handle} href={`/collections/${c.handle}`} className="hover:!text-red-500" onClick={closeMenu}>
                <div className="items-center">
                  <h1 className="pt-3 pb-3 text-center">{c.title}</h1>
                  <Divider className="" />
                </div>
              </LocalizedClientLink>
            ))}
            <div className="pt-6">
              {category.map((c) => (
                c.category_children.length >= 1 ? (
                  <div key={c.name} className="!text-center !me-7">
                    {c.category_children.map((c2) => (
                      <LocalizedClientLink key={c2.handle} href={`/categories/${c2.handle}`} className="hover:text-red-500 hover:cursor-pointer !text-black" onClick={closeMenu}>
                        <div className="flex flex-row gap-3 pt-5">
                          <IconsSideMenu iconName={c2.handle} />
                          <h1 className="hover:text-red-500 hover:cursor-pointer">{c2.name}</h1>
                        </div>
                        <Divider className="pt-3" />
                      </LocalizedClientLink>
                    ))}
                  </div>
                ) : (
                  <div key={c.name} className="flex justify-center !text-center">
                    {!c.parent_category && <h1 className="hover:text-red-500 hover:cursor-pointer pt-3" onClick={closeMenu}>{c.name}</h1>}
                  </div>
                )
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
