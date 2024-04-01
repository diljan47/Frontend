import "./Products.css";
import React, { useEffect, useState } from "react";
import logo512 from "../../images/logo512.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";
import { FaAngleDown, FaStar } from "react-icons/fa";
import { getAllProducts } from "../../features/products/productSlice";
import { IoStarSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import PriceSlider from "../PriceSlider/PriceSlider";

const Products = () => {
  const navigate = useNavigate();
  const prodState = useSelector((state) => state.product?.product);

  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product);
  const [dropdown, setDropdown] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const [colDropdown, setColDropdown] = useState(false);
  const [rateDropdown, setRateDropdown] = useState(false);

  const [sortBy, setSortBy] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [color, setColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(null);

  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  // console.log(prodState);

  //filterStates
  useEffect(() => {
    if (productState && productState.length > 0) {
      let brandResult = [];
      let uniqueGenders = new Set();
      let category = [];
      let colors = [];
      // if (prodState && prodState.length > 0) {
      //   const highestPrice = Math.max(...prodState.map((prod) => prod.price));
      //   setPriceRange([0, highestPrice]);
      // }
      for (let i = 0; i < productState.length; i++) {
        let prod = productState[i];
        uniqueGenders.add(prod?.gender);
        brandResult.push({ _id: prod?.brand?._id, title: prod?.brand?.title });
        for (let j = 0; j < prod?.categories.length; j++) {
          let categoryInfo = prod?.categories[j];
          category.push({
            _id: categoryInfo?._id,
            title: categoryInfo?.title,
          });
        }
        for (let k = 0; k < prod?.color.length; k++) {
          let colorInfo = prod?.color[k];
          colors.push({
            _id: colorInfo?._id,
            title: colorInfo?.title,
          });
        }
      }

      let uniquBrand = brandResult.filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      );
      let uniquCategory = category.filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      );
      let uniquColor = colors.filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      );
      setGender([...uniqueGenders]);
      setBrands(uniquBrand);
      setCategories(uniquCategory);
      setColor(uniquColor);
    }
  }, [productState]);

  useEffect(() => {
    dispatch(
      getAllProducts({
        sort: sortBy,
        brand: selectedBrands,
        gender: selectedGender,
        categories: selectedCategories,
        color: selectedColor,
        priceRange: priceRange,
        minRating: minRating,
      })
    );
  }, [sortBy]);

  const handleSubmit = () => {
    dispatch(
      getAllProducts({
        sort: sortBy,
        brand: selectedBrands,
        gender: selectedGender,
        categories: selectedCategories,
        color: selectedColor,
        priceRange: priceRange,
        minRating: minRating,
      })
    );
  };
  const clearFilters = () => {
    setSelectedBrands([]);
    setSortBy("");
    setSelectedGender([]);
    setSelectedCategories([]);
    setSelectedColor([]);
    setPriceRange([0, 1000]);
    setMinRating(null);
    dispatch(
      getAllProducts({
        sort: "",
        brand: "",
        gender: "",
        categories: "",
        color: "",
        priceRange: "",
        minRating: "",
      })
    );
  };
  return (
    <div className="main-container">
      {/* Category */}
      <div className="category-cont">
        <div className="cat-sub-cont">
          <div className="filter-heading" onClick={() => setDummy(!dummy)}>
            <span>Select Gender</span>
            <FaAngleDown size={20} />
          </div>
          {dummy && (
            <div className="filter-sub">
              {gender &&
                gender.map((genders, i) => (
                  <label key={i} className="sub-menu">
                    <input
                      type="checkbox"
                      checked={selectedGender.includes(genders)}
                      onChange={() => {
                        if (selectedGender.includes(genders)) {
                          setSelectedGender(
                            selectedGender.filter((id) => id !== genders)
                          );
                        } else {
                          setSelectedGender([...selectedGender, genders]);
                        }
                      }}
                    />
                    <span>
                      {genders}(
                      {
                        productState.filter((prod) => prod.gender === genders)
                          .length
                      }
                      )
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
        <div className="cat-sub-cont">
          <div
            className="filter-heading"
            onClick={() => setCatDropdown(!catDropdown)}
          >
            <span>Select Category</span>
            <FaAngleDown size={20} />
          </div>
          {catDropdown && (
            <div className="filter-sub ">
              {categories &&
                categories.map((cats, i) => (
                  <label key={i} className="sub-menu">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cats._id)}
                      onChange={() => {
                        if (selectedCategories.includes(cats._id)) {
                          setSelectedCategories(
                            selectedCategories.filter((id) => id !== cats._id)
                          );
                        } else {
                          setSelectedCategories([
                            ...selectedCategories,
                            cats._id,
                          ]);
                        }
                      }}
                    />

                    <span>
                      {cats?.title} (
                      {
                        productState.filter((prod) =>
                          prod.categories.some((cat) => cat._id === cats._id)
                        ).length
                      }
                      )
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
        <div className="cat-sub-cont">
          <div
            className="filter-heading"
            onClick={() => setColDropdown(!colDropdown)}
          >
            <span>Select Color</span>
            <FaAngleDown size={20} />
          </div>
          {colDropdown && (
            <div className="filter-sub ">
              {color &&
                color.map((cols, i) => (
                  <label key={i} className="sub-menu">
                    <input
                      type="checkbox"
                      checked={selectedColor.includes(cols._id)}
                      onChange={() => {
                        if (selectedColor.includes(cols._id)) {
                          setSelectedColor(
                            selectedColor.filter((id) => id !== cols._id)
                          );
                        } else {
                          setSelectedColor([...selectedColor, cols._id]);
                        }
                      }}
                    />

                    <span>
                      {cols?.title} (
                      {
                        productState.filter((prod) =>
                          prod.color.some((c) => c._id === cols._id)
                        ).length
                      }
                      )
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
        <div className="cat-sub-cont">
          <div
            className="filter-heading"
            onClick={() => setDropdown(!dropdown)}
          >
            <span>Select Brand</span>
            <FaAngleDown size={20} />
          </div>
          {dropdown && (
            <div className="filter-sub ">
              {brands &&
                brands.map((newbrand, index) => (
                  <label key={index} className="sub-menu">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(newbrand._id)}
                      onChange={() => {
                        if (selectedBrands.includes(newbrand._id)) {
                          setSelectedBrands(
                            selectedBrands.filter((id) => id !== newbrand._id)
                          );
                        } else {
                          setSelectedBrands([...selectedBrands, newbrand._id]);
                        }
                      }}
                    />

                    <span>
                      {newbrand?.title}(
                      {
                        productState.filter(
                          (prod) => prod.brand._id === newbrand._id
                        ).length
                      }
                      )
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
        <div className="cat-sub-cont">
          <div
            className="filter-heading"
            onClick={() => setRateDropdown(!rateDropdown)}
          >
            <span>Select Ratings</span>
            <FaAngleDown size={20} />
          </div>
          {rateDropdown && (
            <div className="cat-sub-ratings">
              <label className="rating-label">
                <input
                  type="radio"
                  name="minRating"
                  value="1"
                  checked={minRating === 1}
                  onChange={() => setMinRating(1)}
                />
                <span style={{ fontSize: "14px" }}>
                  1 <FaStar /> and above
                </span>
              </label>
              <label className="rating-label">
                <input
                  type="radio"
                  name="minRating"
                  value="2"
                  checked={minRating === 2}
                  onChange={() => setMinRating(2)}
                />
                <span style={{ fontSize: "14px" }}>
                  2 <FaStar /> and above
                </span>
              </label>
              <label className="rating-label">
                <input
                  type="radio"
                  name="minRating"
                  value="3"
                  checked={minRating === 3}
                  onChange={() => setMinRating(3)}
                />
                <span style={{ fontSize: "14px" }}>
                  3 <FaStar /> and above
                </span>
              </label>
              <label className="rating-label">
                <input
                  type="radio"
                  name="minRating"
                  value="3"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />
                <span style={{ fontSize: "14px" }}>
                  4 <FaStar /> and above
                </span>
              </label>
              <label className="rating-label">
                <input
                  type="radio"
                  name="minRating"
                  value="3"
                  checked={minRating === 5}
                  onChange={() => setMinRating(5)}
                />
                <span style={{ fontSize: "14px" }}>
                  5 <FaStar /> and above
                </span>
              </label>
            </div>
          )}
        </div>
        <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button className="handleSubmit-btn" onClick={handleSubmit}>
            Apply Filters
          </button>
          <button className="clearFilters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
      <div className="products-cont">
        <div className="prod-container">
          <div className="prod-hero">
            <span>Casual</span>
            <div className="prod-sort">
              <span>Sort By : </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="totalrating">Most popular</option>
                <option value="price">Price low to high</option>
                <option value="-price">Price high to low</option>
                <option value="createdAt">Recent</option>
              </select>
            </div>
          </div>
          <div className="prod-section">
            {prodState && prodState.length > 0 ? (
              prodState.map((data, index) => (
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Products Matched</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
