import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const PopularClasses = () => {
    //----------------------------------
    
    //----------------------------------
    const [popClasses,setPopClass]=useState([]);
    const [handleAxios]=UseAxiosSecure();
    useEffect(()=>{
        handleAxios.get("/desending/top-six-class")
        .then(res=>setPopClass(res.data))
    },[])
   

    return (
        <div className='max-w-6xl mx-auto my-14'>
            <h1 className='text-5xl text-neutral-700 font-extrabold text-center my-8'>Popular Classes</h1>
            <div className="divider"></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                  popClasses && popClasses?.slice(0,6).map(popClass=><div className="w-full  shadow-xl image-full">
                  <figure><img src={popClass?.classImage} alt="Shoes" className='rounded-md' /></figure>
                  <div className="-mt-20 pl-5">
                  <p className='text-white text-xl my-1 '>enroll students: <span className='text-3xl bg-black rounded-full p-1  font-extrabold'>{popClass?.enroll}</span></p>
                    <h2 className="text-2xl font-semibold text-white">{popClass?.className}</h2>
                  </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;