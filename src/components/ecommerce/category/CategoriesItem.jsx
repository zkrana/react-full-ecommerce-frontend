// components/ecommerce/category/CategoriesItem.jsx
import React from "react";

const CategoriesItem = ({ category }) => {
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

export default CategoriesItem;
