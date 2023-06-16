import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseSelectedCourse from '../hooks/UseSelectedCourse';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
//-----------------------------
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../check/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK);
//-----------------------------

const StudentPay = () => {
    const {id}=useParams();
    const [handleAxios]=UseAxiosSecure();
    const [selectedCourseData,refetch]=UseSelectedCourse();
    const [course,setCourse]=useState({});
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        const exist=selectedCourseData?.find(selectedCourse=>selectedCourse._id === id);
        if(exist){
            setCourse(exist);
            setTotal(Number(exist.price));
        }
    },[selectedCourseData])
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                {total > 0 && <CheckoutForm total={total} course={course}></CheckoutForm>}
            </Elements>
        </div>
    );
};

export default StudentPay;