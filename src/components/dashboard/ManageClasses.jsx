import React from 'react';
import UseAllpublic from '../hooks/UseAllpublic';
import { Link } from 'react-router-dom';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const ManageClasses = () => {
    const [allInstruct,refetch]=UseAllpublic();
    const [handleAxios]=UseAxiosSecure();
    console.log(allInstruct);
    const handleApprove=(id)=>{
         handleAxios.patch(`/update/approve/${id}`)
         .then(res=>{
            refetch();
            console.log(res.data)
        });
    }
    const handleDeny=(id)=>{
        handleAxios.patch(`/update/deny/${id}`)
        .then(res=>{
            refetch();
            console.log(res.data)
        });
   }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#
                            </th>
                            <th>classImage</th>
                            <th>className</th>
                            <th>Instructor name</th>
                            <th>Instructor email</th>
                            <th>price</th>
                            <th>seats</th>
                            <th>status</th>
                            <th>status btn</th>
                            <th>enrolled students</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                         allInstruct &&   allInstruct?.map((instruct,index)=><tr>
                                <th>
                                    <label>
                                        {index+1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={instruct.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {instruct.className}
                                </td>
                                <td>{instruct.InstructorName}</td>
                                <td>{instruct.InstructorEmail}</td>
                                <td>{instruct.price}</td>
                                <td>{instruct.seats}</td>
                                <td>{instruct.status}</td>
                                <td className='flex flex-col space-y-2'><button
                                disabled={instruct.isDisable} className='btn btn-sm btn-success btn-outline' onClick={()=>handleApprove(instruct._id)}>approve</button>
                                <button
                                disabled={instruct.isDisable} className='btn btn-sm btn-secondary btn-outline' onClick={()=>handleDeny(instruct._id)}>deny</button>
                                <Link to={`/dashboard/feedback/${instruct._id}`}>  <button className='btn btn-sm btn-warning btn-outline'>feedback</button></Link>
                                </td>
                                <td>{instruct.enroll || 0}</td>
                                
                                
                            </tr>  )
                        }
                              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;