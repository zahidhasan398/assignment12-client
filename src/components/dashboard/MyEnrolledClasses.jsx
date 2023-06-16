import React from 'react';
import UseAllenrolledClasses from '../hooks/UseAllenrolledClasses';

const MyEnrolledClasses = () => {
    const [enrolleddata]=UseAllenrolledClasses();
    console.log(enrolleddata);
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
                            <th>price</th>
                            <th>total seats</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                         enrolleddata &&   enrolleddata?.map((instruct,index)=><tr>
                                <th>
                                    <label>
                                        {index+1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={instruct?.classPhoto} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {instruct.courseName}
                                </td>
                                <td>{instruct.instructName}</td>
                                
                                <td>{instruct.price}</td>
                                <td>{instruct.seats}</td>
                                
                                
                                
                            </tr>  )
                        }
                              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrolledClasses;