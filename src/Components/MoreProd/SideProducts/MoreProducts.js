import React from "react";
import "./MoreProducts.css";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import logo512 from "../../../images/logo512.png";
import Rating from "react-rating";

const MoreProducts = () => {
  return (
    <div className="more-prod-cont">
      <div className="more-cont">
        <div className="more-prod-box">
          <div className="more-prod-in">
            <div>
              <img className="more-image" src={logo512} alt="" />
            </div>
            <div className="more-prod-sub">
              <span className="more-prod-title">Gradient Graphic T-shirt </span>
              <span className="more-price">$25</span>
              <span>
                <Rating
                  initialRating={4}
                  readonly={true}
                  fullSymbol={<IoStarSharp />}
                  emptySymbol={<IoStarOutline />}
                  placeholderSymbol={<IoStarOutline />}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreProducts;
