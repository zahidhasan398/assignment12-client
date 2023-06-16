import React from 'react';
import UseSelectedCourse from '../hooks/UseSelectedCourse';
import { FaTrash } from 'react-icons/fa';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const MySelectedClasses = () => {
    const [selectedCourseData,refetch]=UseSelectedCourse();
    const [handleAxios]=UseAxiosSecure();
    console.log(selectedCourseData);
    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              handleAxios.delete(`/delete/selected-course/${id}`)
              .then(res=>{
                console.log(res.data);
                if(res.data.deletedCount>0)
                {   
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
              })

              
            }
          })
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
                            <th>price</th>
                            <th> total seats</th>
                            <th>available seats</th>
                            <th>pay</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         selectedCourseData &&   selectedCourseData?.map((instruct,index)=><tr>
                                <th>
                                    <label>
                                        {index+1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={instruct?.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {instruct.className}
                                </td>
                                <td>{instruct.InstructorName}</td>
                                
                                <td>{instruct.price}</td>
                                <td>{instruct.seats}</td>
                                
                                <td>{instruct.available || instruct.seats}</td>
                                
                                <td><Link to={`/dashboard/pay/${instruct._id}`}><button className='btn btn-outline btn-success btn-sm'>pay</button></Link></td>
                                <td><button onClick={()=>handleDelete(instruct._id)}><FaTrash className='text-xl text-red-600'></FaTrash></button></td>
                                
                            </tr>  )
                        }
                              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;