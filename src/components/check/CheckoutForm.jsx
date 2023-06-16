// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useContext } from 'react';

import { useEffect } from 'react';

import "./CheckOutForm.css";
import { AuthContext } from '../AuthProvider';

import axios from 'axios';


const CheckoutForm = ({total,course}) => {
  console.log(total);
  
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError,setStripeError]=useState("")
  const [clientSecret, setClientSecret] = useState("");
  const {user}=useContext(AuthContext);
  const [processing,setProcessing]=useState(false);
  const [transictionId,setTransictionId]=useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post("https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app/create-payment-intent", {
      
       price : total 
    })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);
    console.log(card);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setStripeError(error.message);
      console.log('[error]', error);
    } else {
      setStripeError("");
      console.log('[PaymentMethod]',
       paymentMethod);
    }
    setProcessing(true);
    const {paymentIntent, error:cofirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "annonymus",
            name:user?.displayName || "annonymus"
          },
        },
      },
    );
    if(cofirmError){
      console.log(cofirmError);
    }
    setProcessing(false);
      console.log(paymentIntent);
      if(paymentIntent.status === "succeeded"){
          setTransictionId(paymentIntent.id);
          axios.post(`https://b7a12-summer-camp-server-side-zahidhasan398.vercel.app/payment`,{
            transictionId:paymentIntent.id,
            date:new Date(),
            status:"course enrolled",
            paidcourseId:course._id,
            price:total,
            courseName:course.className,
            studentEmail:course.studentEmail,
            classPhoto:course.classImage,
            instructId:course.courseId,
            seats:course.seats,
            instructName:course.InstructorName
          })
          .then(res=>console.log(res.data));
      }
    
  };

  return (
    <div>
      <form className='w-2/3 m-4' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-success mx-4 my-4' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      <div className='text-red-600'>{stripeError}</div>
      <div>
        {transictionId &&                        <div className="text-green-700">your transiction id : {transictionId}</div>}
      </div>
    </div>
  );
};
export default CheckoutForm;

