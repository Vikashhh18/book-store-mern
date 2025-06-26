import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/orders/OrderApi'
import { useAuth } from '../../context/authContext'

const OrderPage = () => {
  const { currentUser } = useAuth()
  const { data: orders = [], isLoading } = useGetOrderByEmailQuery(currentUser?.email)

  if (isLoading) return <p className="text-center text-gray-600 mt-10">Loading your orders...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold text-center text-black-700 mb-10">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders placed yet.</div>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Order ID</h3>
                <p className="text-sm text-gray-600 break-all">{order._id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-800">{order.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{order.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Price</p>
                  <p className="font-medium text-green-600">₹{order.totalPrice}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-1">Shipping Address</h4>
                <div className="bg-gray-100 p-3 rounded-md text-sm">
                  <p><strong>City:</strong> {order.address.city}</p>
                  <p><strong>State:</strong> {order.address.state}</p>
                  <p><strong>Country:</strong> {order.address.country}</p>
                  <p><strong>Zipcode:</strong> {order.address.zipcode}</p>
                </div>
              </div>

              <div className="mb-2 text-sm">
                <h4 className="text-gray-500">Products Order id : </h4>
               <div className="space-y-1 text-sm text-gray-700">
  {order.productId.map((id, index) => (
    <p key={index}>• {id}</p>
  ))}
</div>

              </div>

              <p className="text-xs text-gray-400 mt-4">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderPage
