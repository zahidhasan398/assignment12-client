import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Feedback = () => {
    const {id}=useParams();
    console.log(id);
    const [handleAxios]=UseAxiosSecure();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>{
        console.log(data);
        const {feedback}=data;
        handleAxios.patch(`/feedback/update/${id}`,{feedback})
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount>0)
            {
                toast("feedback generate successfully");
            }
        });

    }
    return (
        <div className='bg-gradient-to-r from-neutral-400 to-neutral-300 p-10'
        >
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
            <textarea name="" id="" className='w-full p-1' rows="10" {...register("feedback", { required: true })}></textarea>
            {errors.feedback && <span className='text-red-500'>This field is required</span>}
            <button className='btn btn-block btn-primary my-3' type='submit'>feedback</button>
            </form>   
        </div>
    );
};

export default Feedback;