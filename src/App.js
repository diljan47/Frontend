import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProductPage from "./Pages/SingleProductPage";
import ProductPage from "./Pages/ProductPage";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUpPage";
import HomeLayout from "./Components/Layout/HomeLayout";
import SearchLayout from "./Components/Layout/SearchLayout";
import HomePage from "./Pages/HomePage";
import { Toaster } from "sonner";
import WishlistPage from "./Pages/WishlistPage";
import CartPage from "./Pages/CartPage";
import OrderPage from "./Pages/OrderPage";

function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: { background: "white" },
          className: "my-toast",
          duration: 1000,
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:id" element={<SingleProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />
          </Route>
          <Route path="/search" element={<SearchLayout />}>
            <Route path="products" element={<ProductPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
          </Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
