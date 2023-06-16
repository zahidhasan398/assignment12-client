import React from 'react';
import UseMyClass from '../hooks/UseMyClass';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Myclass = () => {
    const [myClasses] = UseMyClass();
    console.log(myClasses);
    // const {classImage,className,price,seats,status}=myClasses;
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
                            <th>price</th>
                            <th>seats</th>
                            <th>status</th>
                            <th>enrolled students</th>
                            <th>feedback</th>
                            <th>update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         myClasses &&   myClasses?.map((instruct,index)=><tr className={instruct?.status === "deny" && "bg-red-500"}>
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
                                <td>{instruct.price}</td>
                                <td>{instruct.seats}</td>
                                <td>{instruct.status}</td>
                                <td>{instruct.enroll || 0}</td>
                                <td>{instruct.feedback || ""}</td>
                                <td><Link to={`/dashboard/updateinfo/${instruct._id}`}><button><FaEdit className='text-xl'></FaEdit></button></Link></td>
                                
                            </tr>  )
                        }
                              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myclass;