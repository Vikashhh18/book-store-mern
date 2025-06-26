import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(items => items._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product add sussefully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    title: "Product already in cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ok"
                })
            }
        },
        removeToCart:(state,action)=>{
                state.cartItems= state.cartItems.filter(items=>items._id!==action.payload._id);
        },
        removeAllProductIncart:(state)=>{
            state.cartItems=[];
        }
}
});

export const { addToCart,removeToCart,removeAllProductIncart} = cartSlice.actions;

export default cartSlice.reducer