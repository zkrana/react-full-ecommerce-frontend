// pages/categories/[categoryId].jsx

"use client";
import React, { useEffect, useState } from "react";

const CategoryDetailPage = ({ params }) => {
  // console.log(params.categoryId);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch category data using the categoryId
        const response = await fetch(
          `http://localhost:3000/api/categories?categoryId=${params.categoryId}`
        );
        // console.log(categoryId);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Category not found");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setCategory(data);
        }
      } catch (error) {
        setError(`Error fetching category: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    if (params.categoryId) {
      fetchData();
    } else {
      // Handle case where categoryId is not defined (e.g., initial render)
      setLoading(false);
    }
  }, [params.categoryId]); // Ensure dependency on categoryId

  if (loading) {
    return <p>Loading category...</p>;
  }

  if (error) {
    return <p>Error loading category. Please try again later.</p>;
  }

  return (
    <div>
      {category ? (
        <div>
          <h1>Category ID: {params.categoryId}</h1>
          <h2>Category Name: {category.name}</h2>
          {/* Add other details as needed */}
        </div>
      ) : (
        <p>Category not found</p>
      )}
    </div>
  );
};

export default CategoryDetailPage;
