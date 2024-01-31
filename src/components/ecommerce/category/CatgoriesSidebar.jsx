"use client";
import React, { useState, useEffect } from "react";

function CatgoriesSidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost/reactcrud/backend/auth/api/categories/categories.php"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [expandedCategories, setExpandedCategories] = useState([]);

  const handleToggle = (categoryId) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(categoryId)
        ? prevExpanded.filter((id) => id !== categoryId)
        : [...prevExpanded, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId) => {
    return expandedCategories.includes(categoryId);
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <div key={category.id} className="category-item">
        <div
          className="category-header space-y-2 w-full flex justify-between items-center cursor-pointer"
          onClick={() => handleToggle(category.id)}
        >
          <span className="category-name">{category.name}</span>

          {category.subcategories && category.subcategories.length > 0 && (
            <span
              className={`toggle-icon text-base font-medium text-gray-400 ${
                isCategoryExpanded(category.id) ? "expanded" : ""
              }`}
            >
              +
            </span>
          )}
        </div>
        {isCategoryExpanded(category.id) &&
          category.subcategories &&
          category.subcategories.length > 0 && (
            <div className="subcategory-list">
              {renderCategories(category.subcategories)}
            </div>
          )}
      </div>
    ));
  };

  return (
    <div className="categories-sidebar rounded border border-slate-200 p-3 flex flex-col gap-3 py-4">
      <h2 className="text-lg font-semibold pb-3 border-b border-slate-200">
        Categories
      </h2>
      {renderCategories(categories)}
    </div>
  );
}

export default CatgoriesSidebar;
