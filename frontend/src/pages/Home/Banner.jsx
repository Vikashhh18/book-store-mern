import React from 'react'
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg}  alt="" />
        </div>
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This week</h1>
            <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
            <button className='bg-[#FFCE1A] px-12 py-2 rounded-md text-base font-[Nunito Sans] font-bold hover:bg-[#0D0842] hover:text-white transition-all duration-200 cursor-pointer'>Subscribe</button>
        </div>
    </div>
  )
}

export default Banner