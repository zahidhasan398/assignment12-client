import React from 'react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { useEffect } from 'react';
import { useState } from 'react';

const OurClub = () => {
    const [handleAxios]=UseAxiosSecure();
    const  [ourClubs,setOurClub]=useState([]);
    useEffect(()=>{
        handleAxios.get("/our-club")
        .then(res=>{
            console.log(res.data);
            setOurClub(res.data);
        })
    },[])
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <h1 className='text-5xl text-orange-700 font-extrabold text-center my-8'>Our Clubs</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
             {
                ourClubs && ourClubs?.map(club=><div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">club Name: {club?.clubname}</h2>
                  <h2 className="card-title">sporst type: {club?.sportsName}</h2>
                  <h2 className="card-title">club members: {club?.member}</h2>
                  <p>{club?.content}</p>
                </div>
                <figure><img src={club?.image} className='w-full h-[40vh]' alt="Shoes" /></figure>
              </div>)
             }
            </div>
            
        </div>
    );
};

export default OurClub;