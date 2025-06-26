import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartCard from './CartCard';
import { removeAllProductIncart } from '../../redux/features/cart/cartSlice';
import { getAuth } from 'firebase/auth';

const CartPage = () => {

    // const {currentUser}=getAuth();

    const cartItems=useSelector(state=>state.cart.cartItems);
    const totalPrice=cartItems.reduce((acc,item)=>acc+item.newPrice,0).toFixed(2);

    const dispatch=useDispatch();
    const handleClearCart=()=>{
        dispatch(removeAllProductIncart())
    }


  return (
    <>
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
        <div className="ml-3 flex h-7 items-center ">
          <button
          onClick={()=>handleClearCart()}
            type="button"
            className=" cursor-pointer relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
          >
            <span className="">Clear Cart</span>
          </button>
        </div>
      </div>
      
      {
        cartItems.length>0 ? cartItems.map((item)=>(
            <div key={item._id}>
                <CartCard item={item} />
            </div>
        )):<p className='text-red-500 text-lg mt-3'>No item found!!</p>
      }

      </div>


    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500 ">Shipping and taxes calculated at checkout.</p>
      <div className="mt-6">
      <Link

          to="/checkout"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </Link>
        
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <Link to="/">
          or 
          <button
            type="button"
            className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </div>
  </div>
    </>
  )
}

export default CartPage