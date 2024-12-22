import orderHeaderModel from "../../../Interfaces/OrderHeaderModel";

export default interface OrderListProps {
  isLoading: boolean;
  orderData: orderHeaderModel[];
}
