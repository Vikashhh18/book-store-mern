import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";


export const OrderApi = createApi({
     reducerPath: 'OrderApi',
    baseQuery: fetchBaseQuery({
  baseUrl: `${baseUrl}/api/book-orders`,
  credentials: 'include'
}),
     tagTypes:['Orders'],
     endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(newOrder)=>({
                url:"/",
                method:"POST",
                body:newOrder,
                credentials:"include"
            })
        }),
        getOrderByEmail:builder.query({
            query:(email)=>({
                url:`/email/${email}`,
                providesTags: ["Orders"],
            })
        })
     })
})


export const {useCreateOrderMutation,useGetOrderByEmailQuery}=OrderApi;

export default OrderApi;