import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/authContext';

const Register = () => {
    const [message,setMessage]=useState("");
    const {registerUser,SignInWithGoogle}=useAuth();
    const navigate=useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data) =>{
        try {
            console.log(data);
            await registerUser(data.email,data.password);
            alert("user register successfully");
            navigate("/login")
        } catch (error) {
            setMessage("something went wrong");
        }
    }
      const submitSignIn=async(data)=>{
        try {
            await SignInWithGoogle(data.email,data.password);
            alert("login successfully");
            navigate("/");
        } catch (error) {
            setMessage("invalid credintials");
        }
    }

  return (
      <div className='h-[calc(100vh-120px)]  flex items-center flex-col justify-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4 '>
                    <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input  {...register("email", { required: true })} type="email" name='email' id='email' placeholder='Email address' className='shadow appearance-none border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ' />
                </div>
                <div className='mb-4 '>
                    <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input  {...register("password", { required: true })} type="password" name='password' id='password' placeholder='Password ' className='shadow appearance-none border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ' />
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>Please enter valid email and password</p>
                }
               <div>
                <button className='py-2 px-8 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none cursor-pointer'>Register</button>
               </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm '>Have an account? Please
                <Link to={"/login"} className='text-blue-500 hover:text-blue-700 cursor-pointer' > Login</Link>
            </p>
           <div className='mt-4'>
            <button onClick={submitSignIn} className='cursor-pointer w-full flex flex-wrap gap-1 items-center justify-center bg-[#0D0842] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle className='mr-2 ' />
                Sign in with google
            </button>
           </div>
           <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book store . All rights reserved .</p>
        </div>
    </div>
  )
}

export default Register