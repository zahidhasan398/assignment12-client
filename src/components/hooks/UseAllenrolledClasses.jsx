import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAllenrolledClasses = () => {
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    const {data:enrolleddata,isLoading:enrollLoading}=useQuery({queryKey:["enroll-class",user?.email],queryFn:async()=>{
        const res=await handleAxios.get(`/enroll-class/${user?.email}`)
        return res.data
    }});
    return [enrolleddata,enrollLoading];
};

export default UseAllenrolledClasses;