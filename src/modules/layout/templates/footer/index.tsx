import { Text, clx } from "@medusajs/ui"
import '@fortawesome/fontawesome-free/css/all.css';
import { getCategoriesList, getCollectionsList } from "@lib/data"
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from 'next/image';

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 11)

  return (
    <footer className="border-t border-gray-300 bg-gray-100">
      <div className="content-container flex flex-col md:flex-row justify-between 2xsmall:max-md:items-center 2xsmall:max-md:justify-center items-start py-10 px-8 lg:px-16">
        <div className="flex flex-col items-center lg:items-start space-y-4 lg:space-y-8">
          <LocalizedClientLink href="/" className="flex flex-col items-center lg:flex-col lg:items-center space-y-2 lg:space-y-0 space-x-2 text-xl font-bold text-gray-800 hover:text-orange-500">
            <img src="https://i.ibb.co/WgRVZF7/output-onlinepngtools.png" alt="Logo" className="!w-[8rem] !h-[8rem] object-cover rounded-full lg:w-16 lg:h-16" />
            <span>Almohtaref Mobile</span>
          </LocalizedClientLink>

          <ul className="flex justify-center lg:justify-start space-x-4">
            <li className="rounded-full bg-yellow-500 text-white w-10 h-10 flex items-center justify-center">
              <i className="fab fa-snapchat-ghost"></i>
            </li>
            <li className="rounded-full bg-pink-500 text-white w-10 h-10 flex items-center justify-center">
              <i className="fab fa-instagram"></i>
            </li>
            <li className="rounded-full bg-blue-600 text-white w-10 h-10 flex items-center justify-center">
              <i className="fab fa-facebook-f"></i>
            </li>
            <li className="rounded-full bg-blue-700 text-white w-10 h-10 flex items-center justify-center">
              <i className="fab fa-facebook-messenger"></i>
            </li>
            <li className="rounded-full bg-green-500 text-white w-10 h-10 flex items-center justify-center">
              <i className="fab fa-whatsapp"></i>
            </li>
          </ul>
          <iframe className="rounded-lg border-2 border-gray-400 w-full lg:w-[20rem] h-[10rem]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.15572832492!2d35.91531812377336!3d31.90236592816887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca756f4537f89%3A0x62fc85760e28444!2z2KfZhNmF2K3Yqtix2YEg2YTZhNin2KzZh9iy2Kkg2KfZhNiu2YTZiNmK2Kk!5e0!3m2!1sar!2sjo!4v1713482253025!5m2!1sar!2sjo"></iframe>
          <div className="ps-7">
            <a href="tel:00962799776672">Phone Number : 0799776672</a>
          </div>
        </div>
       
        <div className="grid grid-cols-3 gap-x-8 lg:gap-x-16 mt-8 lg:mt-0">
        
          {product_categories && product_categories.length > 0 && (
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-medium text-gray-800">Categories</span>
              <ul className="grid grid-cols-1 gap-2">
                {product_categories.slice(0, 9).map((c) => {
                  if (c.parent_category) return null;

                  const children = c.category_children?.map((child) => ({
                    name: child.name,
                    handle: child.handle,
                    id: child.id,
                  })) || null;

                  return (
                    <li className="flex flex-col gap-2 text-sm text-gray-600" key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-gray-800"
                        href={`/categories/${c.handle}`}
                      >
                        {c.name}
                      </LocalizedClientLink>
                      {children && (
                        <ul className="grid grid-cols-1 ml-3 gap-2">
                          {children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                className="hover:text-gray-800"
                                href={`/categories/${child.handle}`}
                              >
                                {child.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {collections && collections.length > 0 && (
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-medium text-gray-800">Collections</span>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                {collections.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="hover:text-gray-800"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
             <div className=" contact-creator text-sm text-gray-600 ">
          <span className="font-semibold">Website Developed by:</span>
          <div className="mt-2">
            <span className="block">Name: Mohammed Shkier</span>
            <span className="block">Email: contact@mohsh.com</span>
            <span className="block">Phone: 0782011166</span>
          </div>

        </div>
      </div> 
    </div>

      <div className="text-sm text-gray-600 text-center py-5">
        © {new Date().getFullYear()} Almohtaref Store. All rights reserved.
        <Image
        src="/5.png"
        alt="Description of your image"
        width={500} // Optional: Adjust width as needed
        height={300} // Optional: Adjust height as needed
      />      </div>
    </footer>


  )
}
