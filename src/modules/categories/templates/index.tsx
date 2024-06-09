import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container test" data-testid="category-container">
      <div>

      <RefinementList sortBy={sortBy || "created_at"} data-testid="sort-by-container" />
     { /*{category.category_children && (
        
        <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-5">
              {category.category_children?.map((c) => (
                <>
                  <li key={c.id} className="pt-10">
                    <LocalizedClientLink href={`/categories/${c.handle}`}>
                      {c.name}
                     
                    </LocalizedClientLink>

                  </li>
               
                </>
              ))}
            </ul>
          </div>
        )}
      <CategoryTemp categories={categories}/>*/}
      </div>
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1>{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-5">
              {category.category_children?.map((c) => (
                <div className="mb-[6rem]">

                  <li key={c.id} className="pt-10 pb-5 flex justify-between font-bold text-3xl items-center  ">
                    
                    <LocalizedClientLink href={`/categories/${c.handle}`  } className="hover:text-red-700 hover:underline text-red-500 mr-4 ">

                      {"عرض الكل"}
                     
                    </LocalizedClientLink>

                      {c.name}

                  </li>
                  
                  <Suspense fallback={<SkeletonProductGrid />}>
                    <PaginatedProducts
                      sortBy={sortBy || "created_at"}
                      page={pageNumber}
                      categoryId={c.id}
                      countryCode={countryCode}
                    />
                  </Suspense>
                </div>
              ))}
            </ul>
          </div>
        )}
        {category.parent_category && <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
         
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
      </Suspense>}
      </div>
    </div>
  )
}
