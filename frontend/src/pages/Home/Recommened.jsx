import React, { useEffect, useState } from 'react'
import BookCart from '../Books/BookCart';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination,Navigation  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/book/BookApi';

const Recommened = () => {

    const {data:book=[]}=useFetchAllBooksQuery();

  return (
    <div className='py-16'>
          <h2 className='text-3xl  font-semibold mb-6 '>Recommended for you</h2>

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
          book.length>0 && book.slice(5,15).map((book,i)=>(
            <SwiperSlide key={i} ><BookCart book={book}/></SwiperSlide>
            
          ))
        }
      </Swiper>
    </div>
  )
}

export default Recommened