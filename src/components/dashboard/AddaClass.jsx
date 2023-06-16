import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const IMG_BB_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

const AddaClass = () => {
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data)
    const {className,classImage,seats,InstructorName,InstructorEmail,price}=data;
    
    const formData= new FormData();
    formData.append("image",classImage[0]);
    fetch(IMG_BB_URL,{method:"POST",body:formData})
    .then(res=>res.json())
    .then(imgdata=>{
        console.log(imgdata);
        if(imgdata.success){
            const instructorInfo={className,classImage:imgdata.data.display_url,seats,InstructorName,InstructorEmail,price,InstructorPhoto:user?.photoURL,status:"panding",date: new Date()}
            handleAxios.post("/instruct-info",{instructorInfo})
            .then(res=>{console.log(res.data)
            if(res.data.acknowledged){
                toast("successfully added");
            }
            });
            
        }   
    })
};
    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className='grid w-full md:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-r from-neutral-400 to-neutral-300 p-10'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">class name</span>
                    </label>
                    <input type="text" placeholder="class name" className="input input-bordered" {...register("className", { required: true })} />
                    {errors.className && <span className='text-red-500'>This field is required</span>}
                </div>
                <div>
                <label className="label">
                        <span className="label-text">class image</span>
                    </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("classImage", { required: true })} />
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
                    <input type="text" placeholder="Abailable seats" className="input input-bordered" {...register("seats", { required: true })} />
                    {errors.seats && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">price</span>
                    </label>
                    <input type="text" placeholder="price" className="input input-bordered" {...register("price", { required: true })} />
                    {errors.price && <span className='text-red-500'>This field is required</span>}
                </div>
                
                <button type='submit' className="btn btn-block btn-success col-span-2">add btn</button>
            </form>
        </div>
    );
};

export default AddaClass;