import React, { useEffect, useState } from 'react'
import BookCart from '../Books/BookCart';

import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination,Navigation  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/book/BookApi';

const category=["choose a genre","Business","Fiction","horror","Adventure"];

const TopSellers = () => {

  const [selectedCategory,setSelectedCategory]=useState("choose a genre");

 const { data: book = [], isLoading, isError, error } = useFetchAllBooksQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.error || error?.data?.message}</p>;
  
  const filterdBook=selectedCategory==="choose a genre"?book:book.filter(item=>item.category===selectedCategory.toLowerCase()); 

  return (
    <div className='py-10'>
      <h2 className='text-3xl  font-semibold mb-6 '>Top Sellers</h2>
      {/* {filter} */}
      <div className='mb-8 flex items-center'>
        <select onChange={(e)=>setSelectedCategory(e.target.value)} name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {
            category.map((items,index)=>(
              <option key={index} value={items}>{items}</option>
            ))
          }
        </select>
      </div>
      {/* show books with filter  */}
      <div>
          <Swiper
  slidesPerView={1}
  spaceBetween={30}
  navigation={true}
  breakpoints={{
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1180:{
      slidesPerView: 3,
      spaceBetween: 50,
    }
  }}
  modules={[Pagination, Navigation]}
  className="mySwiper">
         {
          filterdBook.length>0 && filterdBook.map((book,i)=>(
            <SwiperSlide key={i} ><BookCart book={book}/></SwiperSlide>
            
          ))
        }
      </Swiper>
       
      </div>
    </div>
  )
}

export default TopSellers