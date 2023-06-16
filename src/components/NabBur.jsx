import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import anime from 'animejs/lib/anime.es.js';

const NabBur = () => {

    //---------------------
    anime.timeline({ loop: true })
        .add({
            targets: '.titleAnime',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 2000,
            delay: (el, i) => 70 * i
        }).add({
            targets: '.titleAnime',
            opacity: 0,
            duration: 2000,
            easing: "easeOutExpo",
            delay: 2000
        });
    //---------------------
    const { user, handleSignOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleOut = () => {
        handleSignOut()
            .then(() => {
                console.log("successfully log out");
                navigate("/login");
            })
            .catch(err => console.log(err.message));
    }
    // const menuItemsOne = <>
    //     <li><Link to="/">Home</Link></li>
    //     <li>
    //         <Link to="/instructor">Instructors</Link>
    //     </li>
    //     <li><Link to="/classes">Classes</Link></li>
    //     <li><Link to="/dashboard">Dashboard</Link></li>
    // </>
    //     const menuItemsTwo = <>
    //     <li><Link to="/">Home</Link></li>
    //     <li tabIndex={0}>
    //         <Link to="/instructor">Instructors</Link>
    //     </li>
    //     <li><Link to="/classes">Classes</Link></li>
    //     <li><Link to="/dashboard">Dashboard</Link></li>    
    // </>


    return (
        <div className='bg-gradient-to-r from-purple-500 to-pink-500'>
            <div className="navbar  max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            <li>
                                <Link to="/instructor">Instructors</Link>
                            </li>
                            <li><Link to="/classes">Classes</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                    <div><button className='text-2xl font-bold hidden md:block titleAnime'>sports tutorial</button></div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-semibold text-white">
                        <li><Link to="/">Home</Link></li>
                        <li tabIndex={0}>
                            <Link to="/instructor">Instructors</Link>
                        </li>
                        <li><Link to="/classes">Classes</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className='flex items-center space-x-2'>
                        {user ? <>
                            <li><button onClick={handleOut} className='btn btn-outline btn-sm'>Logout</button></li>
                            <li><img src={user?.photoURL} className='w-14 h-14 rounded-full' alt="" /></li>
                        </> : <><li><Link to="/login"><button className='btn btn-success'>Login</button></Link></li></>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NabBur;