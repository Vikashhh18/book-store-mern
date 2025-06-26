import React, { useState } from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import avatar from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/authContext';

const navigation=[
  {name:"deshboard",href:"/dashboard"},
  {name:"orders",href:"/orders"},
  {name:"cart page",href:"/cart"},
]

const Navbar = () => {
  
  const cartItems=useSelector(state=>state.cart.cartItems);

  const [isDropdown,setIsDropdown]=useState(false);
  const {currentUser,logout}=useAuth();

  const handleLogout=()=>{
    logout();
  }

  return (
    <header className="max-w-screen-2xl mx-auto px-28 py-6 flex justify-between items-center">
    <nav className="flex items-center justify-between w-full">
    <div className='flex items-center md:gap-16 gap-4 '>
      <Link to={"/"}>
          <HiMiniBars3CenterLeft className='size-6'/>
      </Link>
      <div className='relative sm:w-72 w-40'>
        <IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
        <input type="text" placeholder='Search here' className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none ' />
      </div>
    </div>
    <div className='relative flex items-center md:space-x-3 space-x-2'>
      <div>
      {
        currentUser?<>
        <button onClick={()=>(setIsDropdown(isDropdown===true?false:true))}>
          <img src={avatar} alt="" className={`cursor-pointer size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} /></button>
          {/* // dropdown section  */}
          {isDropdown && (<div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
            <ul className=''>
            {  navigation.map((items)=>(
              <li key={items.name}><Link className='block px-2 py-2 text-sm hover:bg-gray-200' to={items.href}>{items.name}</Link></li>
              ))}
            </ul>
            <button onClick={handleLogout} className='block w-full text-left cursor-pointer px-2 py-2 text-sm hover:bg-gray-200'>Logout</button>
          </div>)}
          
          </> : <Link to={'/login'}><FaRegUser className='size-5 '/></Link>
      }
      </div>

      <button className='hidden sm:block'><FaRegHeart className='size-5 ' /></button>
      <Link to={'/cart'} className='bg-amber-300 p-1 sm:px-6 px-2  flex items-center rounded-sm'>
      <IoCartOutline className='size-5' />
      {cartItems.length>0 ?<span className='text-sm font-semibold sm:ml-1 '>{cartItems.length}</span>:<span className='text-sm font-semibold sm:ml-1 '>0</span>}
      
      </Link>
    </div>

  </nav>
</header>
  )
}

export default Navbar