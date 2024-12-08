import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <section className='flex flex-col items-center justify-center my-20 text-center h-[200px] md:h-[500px] animate-fade'>
            <h1 className='text-2xl md:text-4xl font-bold'>404</h1>
            <h6 className='text-xl md:text-2xl font-bold '>Sorry, the page was not found</h6>
            <p className='text-sm font-normal'>The link you followed has probably broken or the page has been removed.</p>
            <button onClick={() => navigate('/')} className='rounded-full bg-[#fe7678] text-[#FFF] px-10 py-1 my-5 shadow-lg text-sm transition-transform hover:scale-105 duration-500 ease-in-out' >Home</button>
        </section>
    )
}

export default memo(PageNotFound);