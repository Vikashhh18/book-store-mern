import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { useParams } from 'react-router-dom'
import { useFecthBookByIdQuery } from '../../redux/book/BookApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const SingleBook = () => {
  const { id } = useParams()
  const { data: book, isLoading, isError } = useFecthBookByIdQuery(id)

  const cartItem=useSelector(state=>state.cartItem);
  const dispatch=useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  }

  if (isLoading) return <p className="text-center text-sm">Loading...</p>
  if (isError) return <p className="text-center text-red-500 text-sm">Failed to load book.</p>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Book Image */}
        <div className="p-3">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-full h-auto rounded-md object-contain shadow-sm"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-between p-6 text-sm">
          <div>
            <h1 className="text-3xl font-bold text-[#0c083a] mb-4">{book.title}</h1>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
            <p className="text-gray-700 mb-2">
              <strong>Published:</strong> {new Date(book.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-gray-700 mb-6 leading-snug">
              <strong>Description:</strong> {book.description}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => handleAddToCart(book)}
            className="inline-flex items-center gap-2 cursor-pointer bg-[#FFCE1A] hover:bg-[#0D0842] hover:text-white text-[#0D0842] px-4 py-2 rounded-md font-semibold transition duration-200"
          >
            <FiShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleBook
