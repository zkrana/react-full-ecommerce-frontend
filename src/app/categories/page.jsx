"use client";
// components/ecommerce/category/CategoriesPage.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost/reactcrud/backend/auth/api/categories/categories.php"
        );
        const data = await response.json();

        if (data) {
          setCategories(data);
        } else {
          console.error("Invalid data structure in API response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated categories:", categories);
  }, [categories]); // Log categories whenever it is updated

  if (loading) {
    return <p>Loading categories...</p>;
  }

  const handleShowAllClick = (categoryId) => {
    // Use Next.js router to navigate to the dynamic category page
    import("next/router").then((nextRouter) => {
      const router = nextRouter.default;
      router.push(`/categories/${categoryId}`);
    });
  };

  return (
    <div>
      <h1>All Categories</h1>

      <div className="flex flex-wrap gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="ecom-cat-item w-[calc(25%-24px)] flex space-x-4 justify-between rounded p-3 border border-slate-200"
          >
            <div className="ecom-cat-photo w-32 h-32 rounded-sm border border-slate-200 bg-gray-300 flex justify-center items-center">
              <img
                src={`http://localhost/reactcrud/backend/auth/assets/categories/${category.id}/${category.photo_name}`}
                alt={`Category Image: ${category.name}`}
                className="w-full h-full object-fill"
              />
            </div>
            <div className="ecom-cat-d flex flex-col justify-between w-[calc(100%-128px)]">
              <div className="ecom-cat-header flex justify-between">
                <span className="block w-1/2 text-base font-medium">
                  {category.name}
                </span>
                <span className="block w-1/2 text-gray-400 text-sm text-right">
                  ({category.product_count}
                  {category.product_count !== 1 ? "s" : ""})
                </span>
              </div>
              {/* Use Link from next/link to navigate to the dynamic category page */}
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                passHref
              >
                <span
                  onClick={() => handleShowAllClick(category.id)}
                  className="inline-block text-red-300 cursor-pointer"
                >
                  Show All
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
