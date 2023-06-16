import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import UseOnlyInstruct from '../hooks/UseOnlyInstruct';

const PopularInstructor = () => {
    const [onlyInstruct]=UseOnlyInstruct()
    return (
        <div className='max-w-6xl mx-auto my-14'>
            <h1 className='text-5xl text-neutral-700 font-extrabold text-center my-8'>Popular Instructors</h1>
            <div className="divider"></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                  onlyInstruct && onlyInstruct?.slice(0,6).map(popClass=><div className="avatar text-center">
                  <div className="w-[20vw] mask mask-hexagon text-center">
                    <img src={popClass?.photo} />
                  </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;