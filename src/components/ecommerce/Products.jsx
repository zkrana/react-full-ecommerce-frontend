"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartOutline,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost/reactcrud/backend/auth/api/product/products.php")
      .then((response) => response.json())
      .then((data) => {
        // Initialize likedProducts state with an array of false values
        setLikedProducts(Array(data.length).fill(false));
        // Update the state with the fetched products
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleLikeToggle = (index) => {
    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = [...prevLikedProducts];
      newLikedProducts[index] = !newLikedProducts[index];
      return newLikedProducts;
    });
  };

  return (
    <div className=" mt-7">
      <div className=" pb-3 border-b border-slate-200">
        <h2 className="text-lg font-semibold">New Collections</h2>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out relative group"
          >
            <img
              src={`http://localhost/reactcrud/backend/auth/assets/products/${product.product_photo}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-bold text-blue-600">
                ${product.price}
              </div>
              <div className="flex flex-col">
                <div
                  className="text-gray-600 w-5 h-5 justify-center items-center hover:text-blue-600 transition duration-300 ease-in-out hidden group-hover:flex absolute top-3 right-3 z-10 cursor-pointer"
                  onClick={() => handleLikeToggle(index)}
                >
                  <FontAwesomeIcon
                    icon={likedProducts[index] ? faHeart : faHeartOutline}
                    className="text-lg"
                  />
                </div>
                <button className="hidden group-hover:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
