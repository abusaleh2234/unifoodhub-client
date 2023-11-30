import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkout from './Checkout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_APIKEY);
const Payment = () => {
    return (
        <div>
            <h2 className='text-2xl font-bold text-center'>Payment</h2>
            <div className="">
                <Elements stripe={stripePromise}>
                    <Checkout></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;