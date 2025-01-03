import { Region } from "@medusajs/medusa";

import ProductRail from "@modules/home/components/featured-products/product-rail";
import Swiperz2 from "@modules/layout/templates/nav/Swiperz2";
import { retrievePricedProductById } from "@lib/data";
import { ProductCollectionWithPreviews } from "types/global";

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: ProductCollectionWithPreviews[];
  region: Region;
}) {
  // Collect all products from collections
  const pricedProducts: any[] = [];
  collections.forEach((collection) => {
    pricedProducts.push(...(collection.products || []));
  });

  // Map product IDs to priced products
  const pricedProductsArray = await Promise.all(
    pricedProducts.map(async (product) => {
      const pricedProduct = await retrievePricedProductById({
        id: product.id,
        regionId: region.id,
      });
      return { ...product, pricedDetails: pricedProduct };
    })
  );


  return (
    <ul className="flex flex-col-reverse">
      {collections.map((collection) => (
        <li key={collection.id}>
          <ProductRail collection={collection} region={region} />
        </li>
      ))}
      <Swiperz2 classAdded="" itemsArray={pricedProductsArray} region={region} />
    </ul>
  );
}
