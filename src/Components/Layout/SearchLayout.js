import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { PongSpinner } from "react-spinners-kit";

const SearchLayout = () => {
  const isLoading = useSelector((state) => state.product?.isLoading);

  return (
    <>
      <Navbar />
      {isLoading && (
        <div
          className="loader-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(95, 94, 94, 0.281)",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            zIndex: 999,
          }}
        >
          <PongSpinner size={90} loading={isLoading} />
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  );
};

export default SearchLayout;
