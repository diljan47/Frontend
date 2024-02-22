import React from "react";
import "./MainProduct.css";
import logo512 from "../../../images/logo512.png";
import Rating from "react-rating";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const MainProduct = ({ prodData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      {prodData.map((data, index) => (
        <div
          key={index}
          className="prod-box"
          onClick={() => navigate(`/${data?._id}`)}
        >
          <div className="prod-in">
            <div>
              <img className="image" src={logo512} alt="" />
            </div>
            <div className="prod-sub">
              <span className="prod-title">{data?.title} </span>
              <span className="price">{data?.price}</span>
              <span>
                <Rating
                  initialRating={data?.totalrating}
                  readonly={true}
                  fullSymbol={<IoStarSharp />}
                  emptySymbol={<IoStarOutline />}
                />
              </span>
              <span
                onClick={() => {
                  addToWish(data?._id);
                }}
              >
                add wishlist
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainProduct;
