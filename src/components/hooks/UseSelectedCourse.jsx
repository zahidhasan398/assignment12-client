import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const UseSelectedCourse = () => {
    const [handleAxios]=UseAxiosSecure();
    const {user}=useContext(AuthContext);
    const {data:selectedCourseData,refetch,isLoading:selectedCourseDataLoading}=useQuery({queryKey:["get-selected-course",user?.email],queryFn:async()=>{
        const res=await handleAxios.get(`/selected-course/${user?.email}`);
        return res.data;
    }})
    return [selectedCourseData,refetch,selectedCourseDataLoading]
};

export default UseSelectedCourse;