"use client";
import React, { useState, useEffect } from "react";

function CategoryList() {
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

  // Function to calculate the total product count for a category including its subcategories
  function calculateTotalProductCount(category) {
    let totalProductCount = category.product_count || 0;

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        totalProductCount += calculateTotalProductCount(subcategory);
      });
    }

    return totalProductCount;
  }

  // Flatten all categories (including subcategories) and select the top 4 based on the total product count
  const allCategories = categories.flatMap((category) => [
    category,
    ...category.subcategories,
  ]);
  const sortedCategories = allCategories
    .filter((category) => category.product_count > 0)
    .sort(
      (a, b) => calculateTotalProductCount(b) - calculateTotalProductCount(a)
    );

  // Select the first 4 categories
  const slicedCategories = sortedCategories.slice(0, 4);

  console.log("Selected categories:", slicedCategories);

  return (
    <div className="flex flex-wrap gap-8">
      {slicedCategories.map((category) => (
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
                ({calculateTotalProductCount(category)}
                {calculateTotalProductCount(category) !== 1 ? "" : ""})
              </span>
            </div>
            <a className=" inline-block text-red-300 cursor-pointer">
              Show All
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
