"use client";
import React, { useEffect, useState } from "react";

const SingleCat = ({ categoryId }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // Fetch category data from your API
    fetch(`/api/categories/${categoryId}`)
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error:", error));
  }, [categoryId]);

  if (!category) {
    return <p>Loading...</p>; // Handle loading state if needed
  }

  return (
    <div>
      <h1>Category ID: {category.id}</h1>
      <h2>Category Name: {category.name}</h2>
      {/* Add other details as needed */}
    </div>
  );
};

export default SingleCat;
