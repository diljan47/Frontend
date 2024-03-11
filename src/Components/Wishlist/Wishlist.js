import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getuserWishlist } from "../../features/user/userSlice";
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuserWishlist());
  }, []);

  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  return (
    <div className="wishlist-cart-container">
      <div className="wishlist-cart-cont">
        {(wishlistState && wishlistState.length == []) || null ? (
          <span>Wishlist Empty</span>
        ) : (
          ""
        )}
        {wishlistState &&
          wishlistState.map((data, index) => {
            return (
              <div key={index} className="wishlist-cart-sum">
                <div className="wishlist-prod-sum">
                  <div className="wishlist-image-prod">image</div>
                  <div className="wishlist-text-prod">
                    <span>{data?.title}</span>
                    <span>{data?.brand}</span>
                    <span>{data?.price}</span>
                  </div>
                </div>
                <div className="wishlist-delete-col">
                  <div>Dlt</div>
                  <div>-1+</div>
                </div>
                <div className="wishlist-checkout-btn">
                  <span>move to cart</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Wishlist;
