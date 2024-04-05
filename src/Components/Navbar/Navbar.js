import React, { useState } from "react";
import "./Navbar.css";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaCartShopping, FaProductHunt } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/user/userSlice";

const Navbar = () => {
  const userNameState = useSelector((state) => state?.auth?.user?.name);
  const authState = useSelector((state) => state?.auth);
  const [isopen, setIsopen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logOutUser());
    localStorage.clear();
    navigate("/");
    setTimeout(() => {
      if (!authState?.loggedOut) {
        window.location.reload();
      }
    }, 300);
  };
  return (
    <>
      <header className="nav-container">
        <div className="ham-menu">
          <GiHamburgerMenu onClick={() => setIsopen(!isopen)} size={25} />
          <div className="logo-mob">Ecom</div>
        </div>
        <NavLink to={"/"}>
          <div className="logo-web">Ecom</div>
        </NavLink>
        <div className="search">
          <input className="input" placeholder="Search" />
          <div className="search-btn">
            <IoSearch size={20} />
          </div>
        </div>
        <div className="section">
          <div className="search-btn-mob">
            <IoSearch size={24} />
          </div>
          <NavLink to={"/search/products"}>
            <FaProductHunt size={24} />
          </NavLink>

          <NavLink to={"/search/wishlist"}>
            <div>
              <FaHeart size={24} />
            </div>
          </NavLink>
          <NavLink to={"/cart"}>
            <div>
              <FaCartShopping size={24} />
            </div>
          </NavLink>
          <div className="nav-login-btn">
            <RiAccountCircleFill size={24} />
          </div>
          <div
            className="nav-login-btn-mob"
            onClick={() => setIsLoginOpen(!isLoginOpen)}
          >
            <RiAccountCircleFill size={24} />
          </div>

          {authState?.user === null ? (
            <div
              className={isLoginOpen ? "nav-login-cont-mob" : "nav-login-cont"}
            >
              <NavLink to={"/signin"}>
                <div className="nav-login">Login</div>
              </NavLink>
              <NavLink to={"/signup"}>
                <div className="nav-logout">Signup</div>
              </NavLink>
            </div>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
        {userNameState && (
          <span style={{ fontSize: "15px" }}>{userNameState}</span>
        )}
        {/* <button onClick={handleRefresh}>Refresh Token </button> */}
      </header>
      {isopen && (
        <div className="side-nav-background" onClick={() => setIsopen(!isopen)}>
          <div className="side-nav">
            <div className="btn-close" onClick={() => setIsopen(!isopen)}>
              <IoClose size={30} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
