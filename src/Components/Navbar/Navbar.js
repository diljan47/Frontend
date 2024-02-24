import React, { useState } from "react";
import "./Navbar.css";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userNameState = useSelector((state) => state?.auth?.user?.name);
  const authState = useSelector((state) => state?.auth);
  const [isopen, setIsopen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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
          <NavLink to={"/search/products"}>
            <div className="search-btn">
              <IoSearch size={20} />
            </div>
          </NavLink>
        </div>
        <div className="section">
          <div className="search-btn-mob">
            <IoSearch size={24} />
          </div>
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
          <div>
            <RiAccountCircleFill size={24} />
          </div>
          {authState?.user === null ? (
            <NavLink to={"/signin"}>
              <div>Login</div>
            </NavLink>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          <NavLink to={"/signup"}>
            <div>Signup</div>
          </NavLink>
        </div>
        {userNameState && (
          <span style={{ fontSize: "15px" }}>{userNameState}</span>
        )}
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
