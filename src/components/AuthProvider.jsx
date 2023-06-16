import React, { createContext,  useEffect, useState } from 'react';
export const AuthContext=createContext();
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';




const AuthProvider = ({children}) => {
 
 const [user,setUser]=useState(null);
 const [loading,setLoading]=useState(true);
 const provider = new GoogleAuthProvider();
 const auth = getAuth(app);
 const handleSignup=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
 }
 const handleSignIn=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
 }
 const handleUpdateProfile=(name,photo)=>{
    setLoading(true);
    console.log(photo);
    return updateProfile(auth.currentUser,{
      displayName:name,
      photoURL:photo
    })
 }
 const handleSignOut=()=>{
    setLoading(true);
    return signOut(auth);
 }
 const handleGoogleSignIn=()=>{
    return signInWithPopup(auth,provider);
 }
 useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
        
        if(currentUser?.displayName){
         
         //----------------------jwt----------------
         axios.post("https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app/jwt",{email:currentUser?.email})
        .then(res=>{
         localStorage.setItem("jwt-access-token",res.data.token)
         setLoading(false);
        })
         //----------------------jwt----------------
         const userInfo={email:currentUser?.email,name:currentUser?.displayName,photo:currentUser?.photoURL,role:"student",date: new Date()}
        axios.post(`https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app/user/role?email=${currentUser?.email}`,{userInfo})
        .then(res=>console.log(res.data))
        
      }
      else{
         localStorage.removeItem("jwt-access-token")
      }
    })
    return ()=>unsubscribe();
 },[])

 const AuthInfo={user,handleSignIn,handleSignOut,handleSignup,handleUpdateProfile,handleGoogleSignIn};
    return (
        <AuthContext.Provider value={AuthInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;