import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiResponse, menuItemModel, userModel } from "../../../Interfaces";
import { useUpdateShoppingCartMutation } from "../../../apis/shoppingCartApi";
import { toastNotify } from "../../../Helper";
import MiniLoader from "../Common/MiniLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
interface Props {
  menuItem: menuItemModel;
}
function MenuItemCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleAddShoppingCart = async (id: number) => {
    if(!userData.id){
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: id,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };
  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>

          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              onClick={() => handleAddShoppingCart(props.menuItem.id)}
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                style={{ textDecoration: "none", color: "green" }}
                to={`/menuItemDetails/${props.menuItem.id}`}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>₹{props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
