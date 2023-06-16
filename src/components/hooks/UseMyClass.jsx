import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const UseMyClass = () => {
const {user}=useContext(AuthContext);
const [handleAxios]=UseAxiosSecure(); 
const {data:myClasses,isLoading:myClassesLoading}=useQuery({queryKey:["my-classes",user?.email],queryFn:async()=>{
    const res=await handleAxios.get(`/instruct-info/${user?.email}`);
    return res.data; 
}})
 

    return [myClasses,myClassesLoading];
};

export default UseMyClass;