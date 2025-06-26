import React from 'react'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeToCart } from '../../redux/features/cart/cartSlice'

const CartCard = ({item}) => {
  // console.log(item)
  const dispatch=useDispatch();
  const handleRemoveItem=()=>{
    dispatch(removeToCart(item));
  }
  return (
    <div className="mt-8">
         <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                 <li  className="flex py-6">
                   <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                     <img
                      alt=""
                      src={`${getImgUrl(item.coverImage)}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to='/'>{item.title}</Link>
                        </h3>
                        <p className="sm:ml-4">{item.newPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 capitalize"><strong>category: </strong>{item.category}</p>
                    </div>
                    <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                      <p className="text-gray-500"><strong>Qty:</strong> 1</p>

                      <div className="flex">
                        <button onClick={()=>handleRemoveItem(item)}  type="button" className=" cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
      </div>
  )
}

export default CartCard