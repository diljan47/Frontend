import React from "react";
import "./Order.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/user/userSlice";

const Order = () => {
  const cartState = useSelector((state) => state?.auth?.userCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <div className="order-cart-container">
      <div className="cart-cont">
        {cartState &&
          cartState.map((item, index) => {
            return (
              <div key={index} className="cart-sum">
                <div className="prod-sum">
                  <div className="image-prod">image</div>
                  <div className="text-prod">
                    <span>{item?.productId?.title}</span>
                    <span>Size</span>
                    <span>Color</span>
                    <span>${item?.productId?.price}</span>
                  </div>
                </div>
                <div className="delete-col">
                  <div>Dlt</div>
                  <div>-1+</div>
                </div>
              </div>
            );
          })}

        <div className="order-sum">
          <div className="order-sum-col">
            <span>Order Summary</span>
            <div className="order-spacebtw">
              <span>Subtotal</span>
              <span>$565</span>
            </div>
            <span>Total</span>
            <div className="checkout-btn">
              <span>Go to Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
