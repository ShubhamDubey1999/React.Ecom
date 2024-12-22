import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://uat-ecomapi-shubhdev.runasp.net/api/",
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "MenuItem",
      }),
      providesTags: ["MenuItems"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `MenuItem/${id}`,
      }),
      providesTags: ["MenuItems"],
    }),
  }),
});

export const {useGetMenuItemsQuery , useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;