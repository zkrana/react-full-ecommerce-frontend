"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/categories/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
          setCategories(data);
        } else {
          console.error("Invalid data structure in API response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated categories:", categories);
  }, [categories]);

  if (loading) {
    return <p>Loading categories...</p>;
  }

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
                src={`http://localhost/reactcrud/backend/auth/assets/categories/${
                  category.id
                }/${
                  category.category_photo
                    ? category.category_photo.split("/").pop()
                    : "default-image.jpg"
                }`}
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
                  {category.parent_category_id !== undefined ? (
                    <>
                      ({category.product_count}
                      {category.product_count !== 1 ? "s" : ""})
                    </>
                  ) : (
                    "(Product count not available)"
                  )}
                </span>
              </div>

              {/* Use Link to navigate to the dynamic category page */}
              <Link href={`/categories/${category.id}`} passHref>
                <span className="inline-block text-red-300 cursor-pointer">
                  Show Details
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
