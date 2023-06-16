import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import LogIn from './components/LogIn.jsx';
import Registration from './components/Registration.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ManageClasses from './components/dashboard/ManageClasses.jsx';
import ManageUsers from './components/dashboard/ManageUsers.jsx';
import AddaClass from './components/dashboard/AddaClass.jsx';
import Myclass from './components/dashboard/Myclass.jsx';
import MySelectedClasses from './components/dashboard/MySelectedClasses.jsx';
import MyEnrolledClasses from './components/dashboard/MyEnrolledClasses.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UpdateClass from './components/dashboard/UpdateClass.jsx';
// import UseAxiosSecure from './components/hooks/useAxiosSecure.jsx';
import Feedback from './components/dashboard/Feedback.jsx';
import InstructorPage from './components/InstructorPage.jsx';
import Classes from './components/Classes.jsx';
import StudentPay from './components/dashboard/StudentPay.jsx';
import PaymentHistory from './components/dashboard/PaymentHistory.jsx';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import ErrorPage from './components/ErrorPage.jsx';
const queryClient = new QueryClient()
// const [handleAxios]=UseAxiosSecure();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <LogIn></LogIn>
      },
      {
        path: "/signup",
        element: <Registration></Registration>
      },
      {
        path:"/instructor",
        element:<InstructorPage></InstructorPage>
      },
      {
        path:"/classes",
        element:<Classes></Classes>
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path: "manage-classes",
            element: <ManageClasses></ManageClasses>
          },
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>
          },
          {
            path: "add-class",
            element: <AddaClass></AddaClass>
          },
          {
            path: "my-classes",
            element: <Myclass></Myclass>
          },
          {
            path: "my-selected-classes",
            element: <MySelectedClasses></MySelectedClasses>
          },
          {
            path: "my-enrolled-classes",
            element: <MyEnrolledClasses></MyEnrolledClasses>
          },
          {
            path:"updateinfo/:id",
            element:<UpdateClass></UpdateClass>,
            loader:({params})=>axios.get(`https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app/updateinfo/${params.id}`)
          },
          {
            path:"feedback/:id",
            element:<Feedback></Feedback>
          },
          {
            path:"pay/:id",
            element:<StudentPay></StudentPay>
          },
          {
            path:"payment-history",
            element:<PaymentHistory></PaymentHistory>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      
        <RouterProvider router={router}>
        </RouterProvider>
      
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
