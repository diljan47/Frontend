import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Rating from "react-rating";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import img from "../../../images/logo512.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../../../features/products/productSlice";
import { toast } from "sonner";
import { addProductsToCart, getCart } from "../../../features/user/userSlice";
const SingleProduct = () => {
  const singleProdState = useSelector((state) => state?.product?.product);
  const userCartState = useSelector((state) => state?.auth?.userCart);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const pramId = location.pathname.split("/")[1];
  const [isCartAdded, setIsCartAdded] = useState(false);
  console.log(isCartAdded);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addProdsToCart = () => {
    if (color === null) {
      toast.warning("Please Choose A Color");
      return false;
    } else {
      dispatch(
        addProductsToCart({
          productId: singleProdState?._id,
          color,
          quantity,
          price: singleProdState?.price,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getAProduct(pramId));
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let looped = false;
    for (let i = 0; userCartState && i < userCartState.length; i++) {
      if (userCartState[i].productId?._id === singleProdState._id) {
        looped = true;
        break;
      }
    }
    setIsCartAdded(looped);
  }, [singleProdState, userCartState]);
  return (
    <>
      {singleProdState && (
        <div className="single-prod-cont">
          <div className="images-cont">
            <div className="img-left">
              <img src={img} alt="" />
              <img src={img} alt="" />
              <img src={img} alt="" />
            </div>
            <div className="img-right">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="prod-details">
            <div className="prod-text-cont">
              <span className="title-text">{singleProdState?.title}</span>
              <span>
                <Rating
                  initialRating={singleProdState?.totalrating}
                  readonly={true}
                  fullSymbol={<IoStarSharp />}
                  emptySymbol={<IoStarOutline />}
                  placeholderSymbol={<IoStarOutline />}
                />
              </span>
              <div>${singleProdState?.price}</div>
              <span>{singleProdState?.description}</span>
            </div>
            <div className="size-cont">
              <span>choose size</span>
              <div className="size-select">
                <li>Small</li>
                <li>Medium</li>
                <li>Large</li>
              </div>
            </div>
            {isCartAdded ? null : (
              <div className="colors-cont">
                <span className="colors-text">Select Colors</span>
                <div className="colors">
                  {singleProdState?.color &&
                    singleProdState?.color.map((col, i) => (
                      <li
                        onClick={() => setColor(col?._id)}
                        key={i}
                        style={{ backgroundColor: col?.title }}
                      ></li>
                    ))}
                </div>
              </div>
            )}
            <div className="cart-btn-cont">
              <div>
                {isCartAdded ? null : (
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "30px" }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                )}
              </div>
              {isCartAdded ? (
                <button
                  onClick={() => navigate("/order")}
                  className="addCart-btn"
                >
                  Go To Cart
                </button>
              ) : (
                <button
                  onClick={() => addProdsToCart()}
                  className="addCart-btn"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <ProductReviews reviews={singleProdState?.ratings} />
    </>
  );
};

const ProductReviews = ({ reviews }) => {
  return (
    <div className="reviews-cont">
      <div className="head-review">
        <span className="review-title">
          {reviews ? `All Reviews(${reviews?.length})` : "No Reviews"}
        </span>
        <button className="review-btn">Write a review</button>
      </div>
      <div className="Main-review">
        {reviews &&
          reviews.map((rate, i) => {
            return (
              <div key={i} className="main-review-col">
                <span style={{ fontWeight: 600 }} className="title">
                  {rate?.postedby?.name}
                </span>
                <Rating
                  initialRating={rate?.star}
                  readonly={true}
                  fullSymbol={<IoStarSharp />}
                  emptySymbol={<IoStarOutline />}
                  placeholderSymbol={<IoStarOutline />}
                />
                <span className="desc">{rate?.comment}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SingleProduct;
