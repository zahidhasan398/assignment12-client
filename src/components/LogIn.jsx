import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from './AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import {  useLocation, useNavigate } from 'react-router-dom';
const LogIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {handleSignIn,handleGoogleSignIn}=useContext(AuthContext);
    const navigate=useNavigate();
    const location= useLocation();
    const from=location?.state?.from || "/";
    const handlegoogle=()=>{
        handleGoogleSignIn()
        .then(result=>{console.log(result.user)
        navigate(from);
        })
        .catch(err=>console.log(err.message))
    }
  const onSubmit = data => {
    const {email,password}=data;
    console.log(data)
     handleSignIn(email,password)
     .then(result=>{
        navigate(from);
        console.log(result.user);
     })
     .catch(err=>console.log(err.message));
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                            {errors.password && <span>This field is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                            
                        </div>
                        </form>
                        <div className='text-center'>
                            <button className='btn btn-outline btn-success' onClick={handlegoogle}><FcGoogle className='text-2xl'></FcGoogle> </button>
                        </div>
                        <div>
                    i am new in here ?
                    <Link to="/signup">   <button className='text-orange-500 text-xl font-bold'>signup</button></Link>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LogIn;