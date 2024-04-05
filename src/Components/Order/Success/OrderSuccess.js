import { useDispatch, useSelector } from "react-redux";
import "./OrderSuccess.css";

import React, { useEffect } from "react";
import { getUserOrder } from "../../../features/user/userSlice";
const OrderSuccessComp = () => {
  const orderState = useSelector((state) => state?.auth?.userOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder());
  }, [orderState]);

  // check the code its wrong

  return (
    <div className="order-succ-cont">
      <div className="order-succ-sub">
        <span>Your Order</span>
        {orderState && orderState?.orderProducts
          ? orderState?.orderProducts?.map((prods, i) => (
              <div key={i}>
                <img src={prods?.product?.images} alt="" />
              </div>
            ))
          : "Empty Products"}
      </div>
    </div>
  );
};

export default OrderSuccessComp;
