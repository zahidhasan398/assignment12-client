import React from 'react';
import UseOnlyInstruct from './hooks/UseOnlyInstruct';


const InstructorPage = () => {
    const [onlyInstruct]=UseOnlyInstruct()
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto pt-5'>
            {
              onlyInstruct && onlyInstruct?.map(ins=><div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
              <figure><img src={ins?.photo} className='w-[20vh] h-[20vh] rounded-full' alt="Shoes" /></figure>
                <h2 className="card-title">{ins?.name}</h2>
                <p>{ins?.email}</p>
              </div>
            </div>)  
            }
        </div>
    );
};

export default InstructorPage;