import React, { useEffect, useState } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { useGetMenuItemsQuery } from "../../../apis/menuItemApi";
import Loader from "../../../Pages/Loader";
import MainLoader from "../Common/MainLoader";

function MenuItemsList() {
  //const [MenuItems, SetMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
    // fetch("http://uat-ecomapi-shubhdev.runasp.net/api/MenuItem")
    //   .then((x) => x.json())
    //   .then((x) => {
    //     console.log(x);
    //     SetMenuItems(x.result);
    //   });
  }, [isLoading]);
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemsList;
