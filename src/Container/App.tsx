import React, { useEffect, useState } from "react";
import "../index.css";
import { Header, Footer } from "../Components/Layout/index";
import {
  Home,
  MenuItemDetails,
  NotFound,
  ShoppingCart,
  Login,
  Register,
  Payment,
  OrderConfirmed,
  MyOrders,
  OrderDetails,
  MenuItemUpsert,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import MainLoader from "../Components/Page/Common/MainLoader";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";
import jwt_decode from "jwt-decode";
import AllOrders from "../Components/Page/Order/AllOrders";
import { MenuItemsList } from "../Components/Page/MenuItems";
import MenuItemList from "../Pages/MenuItem/MenuItemList";
function App() {
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.id);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/menuItem/menuitemList" element={<MenuItemList />} />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="order/orderconfirmed/:id" element={<OrderConfirmed />} />
          <Route
            path="menuItem/MenuItemUpsert/:id"
            element={<MenuItemUpsert />}
          />
          <Route path="menuItem/MenuItemUpsert" element={<MenuItemUpsert />} />
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
