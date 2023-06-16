import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { MdSwitchAccount,MdOutlineAccountBalance,MdManageHistory,MdOutlineManageHistory } from 'react-icons/md';
import {FcManager} from 'react-icons/fc';

import {GrUserAdmin} from 'react-icons/gr';
const Dashboard = () => {
    const {user,loading}=useContext(AuthContext);
    const [handleAxios]=UseAxiosSecure();
    
    //----------admin check---------------
    const {data:userRoleAdmin={}}=useQuery({
        queryKey:["roleadmin",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/admin")
          return res.data
        }
    })
    //----------admin check---------------
    //----------instructor check----------
    const {data:userRoleInstructor={}}=useQuery({
        queryKey:["roleinstruct",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/instructor")
          return res.data
        }
    })
    //----------instructor check----------
    //----------student check-------------
    const {data:userRoleStudent={}}=useQuery({
        queryKey:["rolestudent",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            
          const res=await handleAxios.get("/user/role/student")
          return res.data
        }
    })
    //----------student check-------------
    
    return (
        <div>
            
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-orange-300  text-2xl font-bold text-neutral-700">
                    {/* Sidebar content here */}
                    {/* for admin start */}
                    {userRoleAdmin?.role === "admin" && <>
                    <li><Link to="/dashboard/manage-classes"><button className='flex'><MdSwitchAccount ></MdSwitchAccount> manage classes</button></Link></li>
                    <li><Link to="/dashboard/manage-users"><button className='flex'><MdOutlineAccountBalance></MdOutlineAccountBalance> manage users</button></Link></li>
                    </> }
                    {/* for admin end */}
                    {/* for instructor start */}
                    {userRoleInstructor?.role === "instructor" &&<> <li><Link to="/dashboard/add-class"><button className='flex '><GrUserAdmin></GrUserAdmin> add a class</button></Link></li>
                     <li><Link to="/dashboard/my-classes"><button className='flex'><MdManageHistory></MdManageHistory> my classes</button></Link></li></>}
                     {/* for instructor end */}
                     {userRoleStudent?.role ==="student" && <><li><Link to="/dashboard/my-selected-classes"><button className='flex'><FcManager></FcManager> My selected classes</button></Link></li>
                     <li><Link to="/dashboard/my-enrolled-classes"><button className='flex'><MdOutlineManageHistory></MdOutlineManageHistory> My enrolled classes</button></Link></li>
                     <li><Link to="/dashboard/payment-history"><button className='flex'><MdManageHistory></MdManageHistory> payment history</button></Link></li></>}
                    </ul>

            </div>
        </div>
        </div>
    );
};

export default Dashboard;