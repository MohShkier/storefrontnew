import itemsNavitems from "@modules/layout/templates/navItems/itemNavItems";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Swiperz from "@modules/layout/templates/navItems/Swiperz";
import {useContext} from "react";
import Products from "./Products";
export default async function NavItems() {
    return (
        <div className={"test"}>
            <nav className="main-menu bg-grey-300  p-3 shadow-md  hover:shadow-lg inset-x-0 z-50 h-full 2xsmall:max-large:h-[12rem]">
                <div className="flex  overflow-x-auto justify-center items-center !h-full">
                    <ul className="flex-shrink-0 flex large:max-w-[80rem] w-full">
                        {itemsNavitems &&
                            itemsNavitems.map((child, index) => (
                                    <LocalizedClientLink
                                        key={child.name}
                                        className="nav-item text-center hover:bg-gray-100 !w-[25rem] "
                                        href={`/offers`}>
                                <li key={index} className=" nav-link p-2 flex flex-col justify-center items-center hover:shadow-lg max-h-[7rem]">

                                        <img src={child.imgSrc} className="max-h-[4rem] " alt={child.name}/>
                                        <span className="mt-1">
                                                      <h1 className="font-bold pt-2 2xsmall:max-small:w-[6rem]">{child.name}</h1>
                                                  </span>
                                </li>
                                    </LocalizedClientLink>
                            ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}