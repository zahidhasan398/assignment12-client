import React, { useContext, useEffect, useState } from 'react';
import UseApprovedClass from './hooks/UseApprovedClass';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

import UseAxiosSecure from './hooks/UseAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

const Classes = () => {
    const [approvedData,refetch]=UseApprovedClass();
    const {user,loading}=useContext(AuthContext);
    
    const [disableApply,setDisableApply]=useState(false);
    const [handleAxios]=UseAxiosSecure();
    const navigate=useNavigate();
    //----------admin check---------------
    const {data:userRoleAdmin={}}=useQuery({
        queryKey:["Adminrole",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/admin")
          return res.data
        }
    })
    //----------admin check---------------
    //----------instructor check----------
    const {data:userRoleInstructor={}}=useQuery({
        queryKey:["Instructrole",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/instructor")
          return res.data
        }
    })
    //----------instructor check----------
    //----------student check-------------
    const {data:userRoleStudent={}}=useQuery({
        queryKey:["Studentrole",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/student")
          return res.data
        }
    })
    //----------student check-------------
    useEffect(()=>{
        
        
        
        if(userRoleAdmin?.role === "admin" || userRoleInstructor?.role === "instructor")
        {
            setDisableApply(true);
        }
        else{
            setDisableApply(false);
        }
        
    },[userRoleAdmin,userRoleInstructor])
    useEffect(()=>{
        approvedData?.map(dta=>{
            if(Number(dta.available) ===0)
            {
                handleAxios.patch(`/not-vacant/update/${dta._id}`)
                .then(res=>{
                    console.log(res.data)
                     refetch();
                });
            }
        })
    },[approvedData])
    const handleSelect=(selectedData)=>{
        if(!user){
            return navigate("/login");
        }
        console.log(selectedData);
        const {InstructorEmail,InstructorName,InstructorPhoto,classImage,className,isDisable,price,seats,status,_id}=selectedData;
        const selectedCourse={InstructorEmail,InstructorName,InstructorPhoto,classImage,className,price,seats,studentEmail:user?.email,courseId:_id,date:new Date(),available: selectedData?.available || seats};
        handleAxios.post(`/selected-course/${_id}`,{selectedCourse})
        .then(res=>{
            if(res.data.acknowledged){
                toast("successfully selected");
            }
            else if(res.data.exist){
            toast("you have already select this course");
            }
        })

    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-5 max-w-7xl mx-auto'>
            {
                approvedData && approvedData?.map(data=><div className={` w-full  shadow-xl image-full ${data?.notVacant ===true ? `card` :"bg-base-100 card"}`}>
                <figure><img src={data?.classImage} alt="Shoes" /></figure>
                <div className={data?.notVacant === true ? " bg-red-600 rounded-xl bg-opacity-80 text-white p-3" :"card-body"}>
                  <h2 className="card-title">{data?.className}</h2>
                  <p>
                    <h1>Instructor name : {data?.InstructorName}</h1>
                    <h1>total seats: {data?.seats}</h1>
                    {Number(data?.available) !== 0 &&<h1>Abailable seats : { data?.available||data?.seats}</h1>}
                    {Number(data?.available) == 0 &&<h1>Abailable seats : { data?.available}</h1>}
                    <h1>price : {data?.price}</h1>
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-warning" disabled={disableApply ||data?.notVacant} onClick={()=>handleSelect(data)}>select</button>
                  </div>
                </div>
              </div>)
            }
            
        </div>
        </div>
    );
};

export default Classes;