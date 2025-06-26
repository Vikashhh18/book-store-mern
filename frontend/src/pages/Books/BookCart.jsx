import React from 'react';
import {Link} from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice';


const BookCart = ({ book }) => {

    const dispatch=useDispatch();

    const addToCartHandler=(product)=>{
        dispatch(addToCart(product));
    }

    return (
        <div  className=" rounded-lg transition-shadow duration-300">
          
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4" >
                <div className="sm:h-72 sm:flex-shrink-0 border border-gray-200 rounded-md">
                    <Link  to={`/book/${book._id}`}>
                        <img
                            src={`${getImgUrl(book.coverImage)}`}
                            alt=""
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>
                <div>
                    <Link to={`/book/${book._id}`}>
                    <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">{book.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-5">{book.description.length>80?`${book.description.slice(0,80)}...`:book.description}</p>
                    <p className="font-medium mb-5">
                        ${book.newPrice} <span className="line-through font-normal ml-2">${book.oldPrice}</span>
                    </p>
                   <button onClick={()=>addToCartHandler(book)}
                    className="bg-[#FFCE1A] cursor-pointer font-[Nunito Sans] flex items-center gap-2 px-6 py-2   hover:bg-[#0D0842] hover:text-white text-[#0D0842] rounded-md font-bold text-sm sm:text-base transition-all duration-200">
  <FiShoppingCart className="text-lg" />
  <span>Add to Cart</span>
</button>

                </div>
            </div>
        </div>
    )
}

export default BookCart