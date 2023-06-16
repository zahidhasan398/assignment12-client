import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const Useroleinfo = () => {
    const {user,loading}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    
    const {data:userRoleInfo,refetch,isLoading:userRoleInfoLoading}=useQuery({
        queryKey:["role",user?.email],
        enabled:!loading,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role")
          return res.data
        }
    })

    return [userRoleInfo,refetch,userRoleInfoLoading];
};

export default Useroleinfo;