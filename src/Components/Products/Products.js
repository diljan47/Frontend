import "../Products/Products.css";
import React from "react";
import MainProduct from "./MainProduct/MainProduct";

const Products = ({ prodData }) => {
  return (
    <div className="prod-container">
      <div className="prod-hero">
        <span>Casual</span>
        <div className="prod-sort">
          <span>Sort By : </span>
          <select>
            <option value="popular">Most popular</option>
            <option value="low">Price low to high</option>
            <option value="high">Price high to low</option>
            <option value="recent">Recent</option>
          </select>
        </div>
      </div>
      <div className="prod-section">
        <MainProduct prodData={prodData} />
      </div>
    </div>
  );
};

export default Products;
