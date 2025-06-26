import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage";
import Checkout from "../pages/Books/Checkout";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/Books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import AdminRegister from "../components/AdminRegister";
import Deshboard from "../pages/Deshboard/Deshboard";
import DashboardLayout from "../pages/Deshboard/DashboardLayout";
import ManageBook from "../pages/Deshboard/manageBook/ManageBook";
// import AddBook from "../pages/Deshboard/addbook/AddBook";
import UpdateBook from "../pages/Deshboard/editBook/UpdateBook";
import AddBook from "../pages/Deshboard/addbook/AddBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage/></PrivateRoute> 
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: (
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>
                )
            },
            {
                path: "/book/:id",
                element: <SingleBook />
            },
            
        ]

    },
    {
        path:"/admin/login",
        element:<AdminLogin/>
    },
    {
        path:"/admin/register",
        element:<AdminRegister/>
    },
   {
  path: "/dashboard",
  element: <AdminRoute><DashboardLayout /></AdminRoute>,
  children: [
    {
      index: true,
      element: <AdminRoute><Deshboard /></AdminRoute>,
    },
    {
      path: "add-new-book",
      element: <AdminRoute><AddBook/></AdminRoute>,
    },
    {
      path: "edit-book/:id",
      element: <AdminRoute><UpdateBook/></AdminRoute>,
    },
    {
      path: "manage-books",
      element: <AdminRoute><ManageBook/></AdminRoute>,
    },
  ],
}

])

export default router;