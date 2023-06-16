import React from 'react';
import Useroleinfo from '../hooks/Useroleinfo';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const ManageUsers = () => {
    const [userRoleInfo,refetch]=Useroleinfo();
    const [handleAxios]=UseAxiosSecure();
    console.log(userRoleInfo);
    const handleAdmin=(id)=>{
        handleAxios.patch(`/update/admin/${id}`)
        .then(res=>{
            refetch();
            console.log(res.data)
        });
    }
    const handleInstruct=(id)=>{
        handleAxios.patch(`/update/instruct/${id}`)
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
                            <th>photo</th>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>role btn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         userRoleInfo &&   userRoleInfo?.map((user,index)=><tr>
                                <th>
                                    <label>
                                        {index+1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {user?.name}
                                </td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td className='flex flex-col space-y-2'><button
                                disabled={user?.isDisable} className='btn btn-sm btn-success btn-outline' onClick={()=>handleAdmin(user?._id)}>admin</button>
                                <button
                                disabled={user?.isDisable} className='btn btn-sm btn-secondary btn-outline' onClick={()=>handleInstruct(user?._id)}>instructor</button></td>   
                            </tr>  )
                        }
                              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;