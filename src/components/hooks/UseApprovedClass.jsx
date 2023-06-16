import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const UseApprovedClass = () => {
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    const {data:approvedData,refetch,isLoading:approvedDataLoading}=useQuery({
        queryKey:["approved-data".user?.email],
        queryFn:async()=>{
         const res=await  handleAxios.get("/approved-class");
         return res.data;
        }
    });

    return [approvedData,refetch,approvedDataLoading]
};

export default UseApprovedClass;