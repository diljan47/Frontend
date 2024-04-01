import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  addProductsToCart,
  getCart,
  getuserWishlist,
  removeWishlist,
} from "../../features/user/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const Wishlist = () => {
  const wishlistState = useSelector((state) => state.auth?.wishlist);
  const userState = useSelector((state) => state?.user);
  const cartState = useSelector((state) => state?.auth?.userCart);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState !== null) {
      dispatch(getCart());
      dispatch(getuserWishlist());
    } else {
      navigate("/signin");
    }
  }, [userState]);

  const removeHandler = (prodId) => {
    dispatch(removeWishlist(prodId));
    setTimeout(() => {
      dispatch(getuserWishlist());
    }, 200);
  };

  const handleMoveToCart = async ({ productId, color, quantity, price }) => {
    setCartBtnDisabled(true);

    try {
      if (color === null) {
        toast.warning("Please choose a color");
        return false;
      }

      if (cartState && cartState.length > 0) {
        const alreadyAdded = cartState.some(
          (item) => item?.productId._id === productId
        );
        if (alreadyAdded) {
          dispatch(removeWishlist(productId));
        } else {
          await dispatch(
            addProductsToCart({
              productId,
              color,
              quantity,
              price,
            })
          );
        }
      } else {
        await dispatch(
          addProductsToCart({
            productId,
            color,
            quantity,
            price,
          })
        );
      }
      setTimeout(() => {
        removeHandler(productId);
      }, 300);
    } catch (error) {
      console.error("Error moving product to cart:", error);
    } finally {
      setCartBtnDisabled(false);
    }
  };

  return (
    <div className="wishlist-cart-container">
      <div className="wishlist-cart-cont">
        {wishlistState && wishlistState.length > 0 ? (
          wishlistState.map((data, index) => {
            return (
              <div key={index} className="wishlist-cart-sum">
                <div
                  onClick={() => navigate(`/${data?._id}`)}
                  className="wishlist-prod-sum"
                >
                  <div className="wishlist-image-prod">image</div>
                  <div className="wishlist-text-prod">
                    <span>{data?.title}</span>
                    {data?.brand && <span>{data?.brand?.title}</span>}
                    <span>{data?.price}</span>
                    <span>rating: {data?.totalrating}</span>
                  </div>
                </div>
                <div className="wishlist-col-cont">
                  {data?.color && data?.color.length > 0
                    ? data?.color.map((col, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => setColor(col?._id)}
                            style={{
                              backgroundColor: col?.title,
                            }}
                          ></li>
                        );
                      })
                    : ""}
                  <input
                    type="number"
                    min={1}
                    style={{
                      width: "33px",
                      height: "18px",
                      alignSelf: "center",
                      padding: "3px",
                    }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <MdDelete
                  className="wishlist-dlt-btn"
                  onClick={() => {
                    removeHandler(data?._id);
                  }}
                  size={25}
                />
                <button
                  className="wishlist-checkout-btn"
                  disabled={cartBtnDisabled}
                  onClick={() =>
                    handleMoveToCart({
                      productId: data?._id,
                      color: color,
                      quantity: quantity,
                      price: data?.price,
                    })
                  }
                >
                  move to cart
                </button>
              </div>
            );
          })
        ) : (
          <span>Wishlist Empty</span>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
