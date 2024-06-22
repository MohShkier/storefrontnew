"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import {useState} from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import "./styles.css"
const SideMenuItems = {
  المحترف: "/",
  المتجر: "/store",
  الحساب: "/account",
  السلة: "/cart",
}

const SideMenu = ({ regions }: { regions: Region[] | null }) => {
  const toggleState = useToggleState()
  const [isOpen, setIsOpen] = useState(false);

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
  
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button data-testid="nav-menu-button" className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-gray-600" onClick={openMenu}>
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
                </Popover.Button>
              </div>

              <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute !w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-gray-600 m-2 backdrop-blur-2xl">
                  <div data-testid="nav-menu-popup" className="flex flex-col bg-white rounded-rounded justify-center p-6 !w-full">
                    <div className="flex justify-end !w-full" id="xmark">
                      <button data-testid="close-menu-button" onClick={() => { close(); closeMenu(); }}>
                        <XMark className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-4 items-start mt-6">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-lg leading-8 hover:text-gray-800"
                              onClick={() => { close(); closeMenu(); }}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
