import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProdCart,
  getCart,
  updateQuantityFromCart,
} from "../../features/user/userSlice";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [quantityUpdates, setQuantityUpdates] = useState({});
  const [productTotals, setProductTotals] = useState({});
  const [subTotals, setSubtotals] = useState(0);
  const cartState = useSelector((state) => state?.auth?.userCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const deleteProduct = (productId) => {
    dispatch(deleteAProdCart(productId));
    setTimeout(() => {
      dispatch(getCart());
    }, 200);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantityUpdates((prevUpdates) => ({
      ...prevUpdates,
      [productId]: newQuantity,
    }));
  };
  useEffect(() => {
    const handleQuantityUpdates = async () => {
      await Promise.all(
        Object.entries(quantityUpdates).map(async ([prodId, newQuantity]) => {
          await dispatch(updateQuantityFromCart({ prodId, newQuantity }));
        })
      );
      await dispatch(getCart());
    };

    handleQuantityUpdates();
  }, [quantityUpdates]);

  useEffect(() => {
    if (cartState && Array.isArray(cartState)) {
      let totals = {};
      cartState.forEach((item) => {
        const total = Number(item?.productId?.price) * item?.quantity;
        totals[item?.productId?._id] = total;
      });
      setProductTotals(totals);

      // Calculate subtotal
      const subTotalSum = Object.values(totals).reduce(
        (acc, total) => acc + total,
        0
      );
      setSubtotals(subTotalSum);
    }
  }, [cartState, quantityUpdates]);

  return (
    <div className="cart-cart-container">
      {cartState && cartState.length > 0 ? (
        <div className="cart-cont">
          {cartState.map((item, index) => (
            <div key={index} className="cart-sum">
              <div className="prod-sum">
                <div className="image-prod">image</div>
                <div className="text-prod">
                  <span>{item?.productId?.title}</span>
                  <span>Size</span>
                  <span>Color</span>
                  <span>${item?.productId?.price}</span>
                  <span>total : {productTotals[item?.productId?._id]}</span>
                </div>
              </div>
              <div className="delete-col">
                <div className="delete-btn">
                  <MdDelete
                    size={25}
                    onClick={() => deleteProduct(item?.productId?._id)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={1}
                    style={{ width: "30px" }}
                    value={
                      quantityUpdates[item?.productId?._id] !== undefined
                        ? quantityUpdates[item?.productId?._id]
                        : item?.quantity
                    }
                    onChange={(e) =>
                      handleQuantityChange(item?.productId?._id, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="cart-sum">
            <div className="cart-sum-col">
              <span>cart Summary</span>
              <div className="cart-spacebtw">
                <span>SubTotal : ${subTotals && subTotals}</span>
              </div>
              <span>Total</span>
              <div className="checkout-btn">
                <NavLink to={"/order"}>
                  <span style={{ color: "white" }}>Go to Checkout</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cart Empty</div>
      )}
    </div>
  );
};

export default Cart;
