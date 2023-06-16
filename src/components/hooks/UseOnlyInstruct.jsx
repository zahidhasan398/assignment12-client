import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProvider';

const UseOnlyInstruct = () => {
    const {user}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure()
    const {data:onlyInstruct,isLoading:onlyInstructLoading}=useQuery({
        queryKey:["onlyInstruct",user?.email],
        queryFn:async()=>{
           const res=await handleAxios.get("/only-instruct");
           return res.data
        }
    })
    return [onlyInstruct,onlyInstructLoading]
};

export default UseOnlyInstruct;