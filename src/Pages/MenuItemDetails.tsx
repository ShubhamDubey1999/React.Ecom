import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMenuItemByIdQuery } from "../apis/menuItemApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useUpdateShoppingCartMutation } from "../apis/shoppingCartApi";
import MainLoader from "../Components/Page/Common/MainLoader";
import { MiniLoader } from "../Components/Page/MenuItems";
import { apiResponse, userModel } from "../Interfaces";
import { toastNotify } from "../Helper";
import { RootState } from "../Storage/Redux/store";

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  if (isLoading) {
    return <MainLoader />;
  }
  //3c222c8f-8ca1-4b95-ac3d-a37cae1d0d8b
  const handleQuantity = (counter: number) => {
    setQuantity(quantity + counter == 0 ? 1 : quantity + counter);
    return;
  };
  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };
  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.result.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {data.result.description}
          </p>
          <span className="h3">₹{data.result.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              onClick={() => handleQuantity(-1)}
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
            <span className="h3 mt-3 px-3">{quantity}</span>
            <i
              onClick={() => handleQuantity(+1)}
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (
                <button disabled className="form-control btn btn-success">
                  <MiniLoader />
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(data.result?.id)}
                  className="btn btn-success form-control"
                >
                  Add to Cart
                </button>
              )}
            </div>

            <div className="col-5 ">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-secondary form-control"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={data.result.image}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt="No content"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
