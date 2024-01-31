"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

async function fetchCategories() {
  const response = await fetch(
    "http://localhost/reactcrud/backend/auth/api/categories/categories.php"
  );
  const data = await response.json();
  return data; // Adjust this based on your API response structure
}

function createNestedMenu(categories, parentId = null) {
  const nestedMenu = [];
  for (const category of categories) {
    if (category.parent_category_id === parentId) {
      const children = createNestedMenu(categories, category.id);
      if (children.length) {
        category.subcategories = children;
      }
      nestedMenu.push(category);
    }
  }
  return nestedMenu;
}

function renderSubMenu(subCategory) {
  if (!subCategory.subcategories || subCategory.subcategories.length === 0) {
    return null;
  }

  return (
    <ul className="absolute sub-sub-menu left-full top-0 hidden bg-white shadow-md py-2 ml-2">
      {subCategory.subcategories.map((subSubCategory) => (
        <li key={subSubCategory.id} className="relative group">
          <Link href={`/subcategory/${subSubCategory.id}`}>
            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 cursor-pointer h-11">
              {subSubCategory.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function renderNestedMenu(menu) {
  if (!menu || menu.length === 0) {
    return null;
  }

  return (
    <ul className="absolute sub-menu left-0 top-0 hidden group-hover:block bg-white shadow-md py-2">
      {menu.map((category) => (
        <li key={category.id} className="relative group">
          <Link href={`/category/${category.id}`}>
            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 cursor-pointer h-11">
              {category.name}
            </span>
          </Link>
          {renderSubMenu(category)}
        </li>
      ))}
    </ul>
  );
}

function MainNav() {
  const [categories, setCategories] = useState([]);
  const [nestedMenu, setNestedMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const menu = createNestedMenu(categories);
      setNestedMenu(menu);
    }
  }, [categories]);

  return (
    <nav className="h-12">
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className="main-menu flex items-center space-x-6 h-full">
          {nestedMenu.map((category) => (
            <li key={category.id} className="relative group">
              <Link href={`/category/${category.id}`}>
                <span className="flex items-center text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer h-11">
                  {category.name}
                </span>
              </Link>
              {category.subcategories &&
                renderNestedMenu(category.subcategories)}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default MainNav;
