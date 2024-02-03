"use client";
"use client";
import React, { useEffect, useState } from "react";

const CategoryDetailPage = ({ params }) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch category data using the categoryId
        const response = await fetch(
          `http://localhost:3000/api/categories/${params.categoryId}`
        );

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

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading category...</p>;
  }

  if (error) {
    return <p>Error loading category: {error}</p>;
  }

  return (
    <div>
      {category ? (
        <div>
          <h1>Category ID: {category.id}</h1>
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
