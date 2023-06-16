import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from 'react-router-dom';



const UpdateClass = () => {
    const updatedData=useLoaderData();
    console.log(updatedData);
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {console.log(data)
        const {className,classImage,seats,InstructorName,InstructorEmail,price}=data;
        
        
                const instructorInfo={className,classImage: updatedData?.data?.classImage,seats,InstructorName,InstructorEmail,price,InstructorPhoto:user?.photoURL,status:"panding"}
                handleAxios.patch(`/instruct-info/${updatedData?.data?._id}`,{instructorInfo})
                .then(res=>{console.log(res.data)
                if(res.data.acknowledged){
                    toast("successfully updated");
                }
                });
                
            }   
     
    return (
        <div>
            <ToastContainer />
            {
                updatedData && <form onSubmit={handleSubmit(onSubmit)} className='grid w-full md:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-r from-neutral-400 to-neutral-300 p-10'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">class name</span>
                    </label>
                    <input type="text" defaultValue={updatedData?.data?.className} placeholder="class name" className="input input-bordered" {...register("className", { required: true })} />
                    {errors.className && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">photo url</span>
                    </label>
                    <input type="url" defaultValue={updatedData?.data?.classImage} placeholder="class name" className="input input-bordered" {...register("classImage", { required: true })} />
                    {errors.classImage && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Instructor name</span>
                    </label>
                    <input type="text" value={user?.displayName} placeholder="Insturctor name" className="input input-bordered" {...register("InstructorName", { required: true })} />
                    
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Instructor email</span>
                    </label>
                    <input type="text" value={user?.email} placeholder="Insturctor email" className="input input-bordered" {...register("InstructorEmail", { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Available seats</span>
                    </label>
                    <input type="text" defaultValue={updatedData?.data?.seats} placeholder="Abailable seats" className="input input-bordered" {...register("seats", { required: true })} />
                    {errors.seats && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">price</span>
                    </label>
                    <input type="text" defaultValue={updatedData?.data?.price} placeholder="price" className="input input-bordered" {...register("price", { required: true })} />
                    {errors.price && <span className='text-red-500'>This field is required</span>}
                </div>
                
                <button type='submit' className="btn btn-block btn-success col-span-2">update</button>
            </form>
            }
        </div>
    );
};

export default UpdateClass;