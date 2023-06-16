import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
const IMG_BB_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
const Registration = () => {
    const [cofirmError,setConfirmError]=useState("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {handleSignup,handleUpdateProfile,handleSignOut}=useContext(AuthContext);
    const navigate=useNavigate();
  const onSubmit = data => {
    const {password,confirmpassword,email,image,name}=data;
    console.log(data);
    if(password !== confirmpassword){
        setConfirmError("password not match");
        return 
    }
    setConfirmError("");
    const formData= new FormData();
    formData.append("image",image[0]);
    fetch(IMG_BB_URL,{method:"POST",body:formData})
    .then(res=>res.json())
    .then(imgdata=>{
        console.log(data);
        if(imgdata.success){
            
            handleSignup(email,password)
    .then(result=>{
        console.log(result.user);
         handleUpdateProfile(name,imgdata.data.display_url)
         .then(()=>{
            console.log("profile is updated");
            handleSignOut()
            .then(()=>{
                console.log("successfully log out")
                navigate("/login");
            })
            .catch((err)=>{
                console.log(err.message);
            })

         })
         .catch((err)=>{
            console.log(err.message);
         })
    })
    .catch((err)=>{
        console.log(err.message);
    })

        }   
    })
    
        
    
};
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body" >
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">name</span>
                            </label>
                            <input type="text" placeholder="name"
                            {...register("name", { required: true })} className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">email</span>
                            </label>
                            <input type="email" placeholder="email"
                            {...register("email", { required: true })} className="input input-bordered" />
                            {errors.email && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div>
                        <label className="label">
                                <span className="label-text">upload your image</span>
                            </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs my-2" {...register("image", { required: true })} />
                        {errors.image && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                            type="password" placeholder="password" className="input input-bordered" {...register("password", { pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+|;':",.<>/?]).+$/,required:true})}/>
                            {errors.password && <span className='text-red-600'>at least one capital letter and one special character</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">confirm Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" {...register("confirmpassword", { pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+|;':",.<>/?]).+$/,required:true})} />
                            {errors.confirmpassword && <span className='text-red-600'>at least one capital letter and one special character</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">signup</button>
                        </div>
                    </form>
                    <div>
                        {cofirmError && <span className='text-red-500'>password not match</span>}
                    </div>
                    <div>
                        i have already an account <Link to="/login"><button className='text-orange-500 text-xl font-bold'>signin</button></Link>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Registration;