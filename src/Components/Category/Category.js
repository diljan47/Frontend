import React, { useState } from "react";
import "../Category/Category.css";
import { FaAngleDown } from "react-icons/fa";
import Products from "../Products/Products";

const Category = ({ prodData }) => {
  return (
    <div className="main-container">
      <div className="category-cont">
        <FilterSection prodData={prodData} />
      </div>

      <div className="products-cont">
        <Products prodData={prodData} />
      </div>
    </div>
  );
};

const FilterSection = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className="filter-heading" onClick={handleToggleDropdown}>
        <span>dfdf </span>
        <FaAngleDown size={20} />
      </div>
      {dropdown && (
        <div className="filter-sub">
          <span className="sub-menu">sds</span>
        </div>
      )}
    </>
  );
};

export default Category;
