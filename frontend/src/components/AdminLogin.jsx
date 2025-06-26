// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { baseUrl } from '../utils/baseUrl';

// const AdminLogin = () => {

//    const navigate = useNavigate();
//   const [message, setMessage] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//   try {
//     const response = await axios.post(`${baseUrl}/api/auth/admin`, {
//       ...data
//     });

//     // Check for status 200 and token (optional)
//     if (response.status === 200 && response.data.message === "Login successful") {
//       alert('Admin login successfully!');
//       navigate('/deshboard'); // ✅ spelling matched with your route
//     } else {
//       setMessage(response.data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error(error);
//     setMessage(error.response?.data?.message || 'Something went wrong');
//   }
// };


//   return (
//   <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 px-4">
//   <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 space-y-6">
//     <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
    
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//       <div>
//         <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//         <input
//           {...register("username", { required: true })}
//           type="text"
//           id="username"
//           placeholder="Enter your username"
//           className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//         <input
//           {...register("password", { required: true })}
//           type="password"
//           id="password"
//           placeholder="Enter your password"
//           className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {message && (
//         <p className="text-red-500 text-sm text-center">Invalid username or password</p>
//       )}
//       {errors.username && <p className="text-red-400 text-sm">Username is required</p>}
// {errors.password && <p className="text-red-400 text-sm">Password is required</p>}

//         <p className='align-baseline font-medium mt-4 text-sm '>Haven't an account ? Please 
//                 <Link to={"/admin/register"} className='text-blue-500 hover:text-blue-700 cursor-pointer' > Register</Link>
//             </p>

//       <button
//         type="submit"
//         className="w-full py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
//       >
//         Login
//       </button>
//     </form>

//     <p className="text-center text-gray-400 text-xs">
//       © 2025 Book Store. All rights reserved.
//     </p>
//   </div>
// </div>

//   )
// }

// export default AdminLogin

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/admin`, data);

      if (response.status === 200 && response.data.message === "Authentication successful") {
        // ✅ Save token to localStorage
        localStorage.setItem('token', response.data.token);

        alert('Admin login successfully!');
        navigate('/dashboard'); // ✅ fix spelling if necessary
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-400 text-sm">Username is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm">Password is required</p>}
          </div>

          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          <p className='align-baseline font-medium mt-4 text-sm '>
            Haven't an account? Please
            <Link to={"/admin/register"} className='text-blue-500 hover:text-blue-700 cursor-pointer'> Register</Link>
          </p>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs">
          © 2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
