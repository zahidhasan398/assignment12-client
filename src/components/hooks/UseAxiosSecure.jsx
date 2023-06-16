import React, { useContext, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
const handleAxios= axios.create({
  baseURL:'https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app'
})

const UseAxiosSecure = () => {
    

    console.log("hsafhdahj"); 
    const {handleSignOut}=useContext(AuthContext);
    
    const navigate=useNavigate();
   
    useEffect(() => {
        handleAxios.interceptors.request.use((config) => {
          const token = localStorage.getItem('jwt-access-token');
          if (token) {
            config.headers.authorization = `Bearer ${token}`;
          }
          return config;
        });
    
        handleAxios.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && (error.response.status === 402 || error.response.status === 403)) {
             await handleSignOut();
              navigate('/login');
            }
            return Promise.reject(error);
          }
        );
      }, [  handleAxios]);
      



    return [handleAxios] 
};

export default UseAxiosSecure;