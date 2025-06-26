import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice.js';
import { bookApi } from './book/BookApi.js';
import { OrderApi } from './orders/OrderApi.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      OrderApi.middleware
    ),
});

export default store;
