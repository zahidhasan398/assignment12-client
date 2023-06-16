import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { AuthContext } from '../AuthProvider';

const UseAllpublic = () => {
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    const {data:allInstruct,refetch,isLoading:allInstructLoading}=useQuery({queryKey:["all-instruct",user?.email],queryFn:async()=>{
        const res=await  handleAxios.get("/all-instruct")
        return res.data
    }})
    return [allInstruct,refetch,allInstructLoading]
};

export default UseAllpublic;