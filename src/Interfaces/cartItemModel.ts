import menuItemModel from "./menuItemModel";

export default interface CartItemModel {
  id?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  quantity?: number;
  shoppingCartId?: number;
}
