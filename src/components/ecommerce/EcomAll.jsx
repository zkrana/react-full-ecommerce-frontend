import React from "react";
import Allccategory from "./category/CatgoriesSidebar";
import BestSeller from "./BestSeller";
import DealOfTheDay from "./DealOfTheDay";
import NewArrival from "./NewArrival";
import Trending from "./Trending";
import TopRated from "./TopRated";
import Products from "./Products";
import CategoryList from "./category/CategoryList";

function EcomAll() {
  return (
    <div className=" w-[90%] mx-auto mt-14">
      <div className="ecom-main-cat">
        <CategoryList />
      </div>
      <div className="w-full flex justify-between gap-8 mt-10">
        <div className="sideBar w-[calc(25%-24px)] flex flex-col">
          <Allccategory />
          <BestSeller />
        </div>
        <div className="ecomBody w-[calc(75%-8px)]">
          <DealOfTheDay />
          <div className="featured-com flex justify-between space-x-6 mt-14">
            <NewArrival />
            <Trending />
            <TopRated />
          </div>
          <Products />
        </div>
      </div>
    </div>
  );
}

export default EcomAll;
