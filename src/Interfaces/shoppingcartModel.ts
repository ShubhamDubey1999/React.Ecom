import CartItemModel from "./cartItemModel";

export default interface shoppingcartModel {
  id?: number;
  userId?: string;
  cartItems?: CartItemModel[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}
