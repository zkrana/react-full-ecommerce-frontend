"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch banners when the component mounts
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost/reactcrud/backend/auth/api/banner/banner.php"
        );
        setBanners(response.data.banners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-[90%] mx-auto overflow-hidden rounded mt-2">
      {loading ? (
        <p>Loading banners...</p>
      ) : (
        <div className=" w-full">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id} className="w-full h-[450px]">
                <img
                  className=" w-full h-full object-cover"
                  src={`http://localhost/reactcrud/backend/auth/assets/banner/${banner.photo_name}`}
                  alt={banner.photo_name}
                />
              </div>
            ))
          ) : (
            <p>No banners found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Banner;
