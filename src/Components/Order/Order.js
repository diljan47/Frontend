import "../Order/Order.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import OrderSuccessComp from "../Order/Success/OrderSuccess";
import {
  createOrderCart,
  getCart,
  getUserOrder,
} from "../../features/user/userSlice";

const createConfig = () => {
  const getToken = localStorage.getItem("token");
  return {
    headers: {
      authorization: `Bearer ${getToken || ""}`,
      Accept: "application/json",
    },
  };
};

const orderSchema = Yup.object({
  fullname: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.number().required("Pincode should be valid"),
});

const stateOptions = [
  { value: "Kerala", label: "Kerala" },
  { value: "Bangalore", label: "Bangalore" },
  // Add more states as needed
];

const Order = () => {
  const cartState = useSelector((state) => state?.auth?.userCart);
  const userState = useSelector((state) => state?.auth?.user);
  const orderState = useSelector((state) => state?.auth?.userOrder);
  const [subtotal, setSubtotal] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(20);
  const [taxFee, setTaxFee] = useState(5);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setshippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayOrderId: "",
    razorpayPaymentId: "",
  });
  const [cartDetails, setCartDetails] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const userId = userState?.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      state: "",
      pincode: "",
    },
    onSubmit: (values) => {
      setshippingInfo(values);
    },
    validationSchema: orderSchema,
  });
  useEffect(() => {
    let total = 0;
    let detailsArray = [];

    if (cartState && cartState.length) {
      for (let i = 0; i < cartState.length; i++) {
        total = total + Number(cartState[i].quantity * cartState[i].price);
        setSubtotal(total);
        setTotalAmount(total + deliveryFee + taxFee);

        const itemDetails = {
          product: cartState[i]?.productId._id,
          color: cartState[i]?.color._id,
          price: cartState[i]?.price,
          quantity: cartState[i]?.quantity,
        };

        detailsArray.push(itemDetails);
      }
    }

    setCartDetails(detailsArray);
  }, [cartState]);

  useEffect(() => {
    if (
      paymentInfo.razorpayOrderId !== "" &&
      paymentInfo.razorpayPaymentId !== ""
    ) {
      dispatch(
        createOrderCart({
          userId,
          shippingInfo,
          paymentInfo,
          orderProducts: cartDetails,
          totalAmount,
        })
      );
    }
  }, [paymentInfo, dispatch, shippingInfo, totalAmount, cartState, userState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online ?");
      return;
    }

    const result = await axios.post(
      `${baseUrl}/user/order/checkout`,
      { totalAmount },
      createConfig()
    );
    // console.log(result?.data);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result?.data?.order;
    const options = {
      key: process.env.REACT_APP_PAYMENT_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Ecom Corp.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const successResult = await axios.post(
          `${baseUrl}/user/order/success`,
          data,
          createConfig()
        );

        setPaymentInfo({
          razorpayOrderId: successResult?.data?.razorpayOrderId,
          razorpayPaymentId: successResult?.data?.razorpayPaymentId,
        });
        if (successResult?.data !== null) {
          setOrderSuccess(true);
        }
      },
      prefill: {
        name: "Ecom Dev",
        email: "EcomDev@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Ecommerce Dev Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {orderSuccess ? (
        <OrderSuccessComp />
      ) : (
        <div className="order-container">
          <div className="title-checkout">Check Out</div>
          <div className="status-box">
            <div>
              <span>1</span>
              <span>Shipping & Contact Info</span>
            </div>
            <div>
              <span>2</span>
              <span>Payment Info</span>
            </div>
          </div>
          <div className="contact-cont">
            <div className="shipping-cont">
              <form
                className="shipping-form-cont"
                onSubmit={formik.handleSubmit}
              >
                <span>Full Name </span>
                <input
                  name="fullname"
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                <span className="formik-error">
                  {formik.touched.fullname && formik.errors.fullname}
                </span>
                <span>Address </span>
                <input
                  name="address"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                <span className="formik-error">
                  {formik.touched.address && formik.errors.address}
                </span>
                <span>Select State </span>
                <select
                  id="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  name="state"
                >
                  <option value="">Select State</option>
                  {stateOptions.map((stateOption) => (
                    <option key={stateOption.value} value={stateOption.value}>
                      {stateOption.label}
                    </option>
                  ))}
                </select>
                <span>Pincode </span>
                <input
                  name="pincode"
                  placeholder="Pincode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                />
                <span className="formik-error">
                  {formik.touched.pincode && formik.errors.pincode}
                </span>
                <button type="submit">Submit</button>
              </form>
            </div>

            {/* only view edit takes back to cartpage */}
            <div className="order-summary-cont">
              {cartState &&
                cartState?.map((item, i) => {
                  return (
                    <div key={i} className="order-user-cart">
                      <span>{item?.productId?.title}</span>
                      <span>quantity : {item?.quantity}</span>
                      <span>price : ${item?.productId?.price}</span>
                    </div>
                  );
                })}
              <div className="user-total-cont">
                <div className="user-subtotal">
                  <span>Subtotal </span>
                  <span>{subtotal} </span>
                </div>
                <div className="user-subtotal">
                  <span>Delivery Fee </span>
                  <span>{deliveryFee}</span>
                </div>
                <div className="user-subtotal">
                  <span>Tax </span>
                  <span>{taxFee} </span>
                </div>
                <div className="user-subtotal">
                  <span style={{ color: "red", fontWeight: 400 }}>
                    Total Amount
                  </span>
                  <span style={{ color: "red", fontWeight: 400 }}>
                    $ {totalAmount}
                  </span>
                </div>
              </div>
              <button
                className="payment-btn"
                disabled={shippingInfo == null ? true : false}
                onClick={displayRazorpay}
              >
                Checkout
              </button>
              <button
                className="payment-btn"
                onClick={() => dispatch(getUserOrder())}
              >
                Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Order;
