import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://uat-ecomapi-shubhdev.runasp.net/api/",
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `ShoppingCart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "ShoppingCart",
        method: "Post",
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags:["ShoppingCarts"]
    }),
  }),
});

export const { useGetShoppingCartQuery ,useUpdateShoppingCartMutation} = shoppingCartApi;
export default shoppingCartApi;
