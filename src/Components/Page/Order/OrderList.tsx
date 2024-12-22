import React from "react";
import OrderListProps from "./orderListType";
import MainLoader from "../Common/MainLoader";
import { OrderHeaderModel } from "../../../Interfaces";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../../../Helper";

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();
  return (
    <div>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {orderData.map((orderItem: OrderHeaderModel) => {
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-1">{orderItem.orderHeaderId}</div>
                  <div className="col-2">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    ₹ {orderItem.orderTotal?.toFixed(2)}
                  </div>
                  <div className="col-1"># {orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-2">
                    <span
                      className={`badge bg-${getStatusColor(
                        orderItem.status!
                      )}`}
                    >
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-1">
                    <button
                      onClick={() => {
                        navigate(
                          "/order/orderDetails/" + orderItem.orderHeaderId
                        );
                      }}
                      className="btn btn-success"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;
