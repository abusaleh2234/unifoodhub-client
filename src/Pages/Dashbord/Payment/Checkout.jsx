import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";




const Checkout = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const param = useParams()
    const { user } = useAuth()
    const [transectionId, setTransectionId] = useState('')
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState("");
console.log(param);

    const { data: membore, refetch, isLoading } = useQuery({
        queryKey: ["mealreq",param.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singelmembore/${param.id}`)
            return res.data
        }
    })
    console.log(membore);

    // const price = requestedMeals.reduce((total, item) => total + item.price,0)

    useEffect(() => {
        if(!membore){
            return
        }
        const { price } = membore
        axiosSecure.post("/create-payment-intent", { price })

            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure,membore])
    console.log(clientSecret);
    const hendelSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log("paymentmethode error", error);
            setError(error.message)
        }
        else {
            console.log("payment methode", paymentMethod);
            setError("")
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm eror", confirmError);
        }
        else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransectionId(paymentIntent.id)

                axiosSecure.put(`/updatesubscribtion?email=${user?.email}&id=${membore._id}`)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.modifiedCount > 0){
                            Swal.fire({
                                title: "Good job!",
                                text: "You clicked the button!",
                                icon: "success"
                              });
                        }
                    })
            }
        }
    }

    return (
        <>
            {
                isLoading ? <h2>Looding..</h2> :
                    <form onSubmit={hendelSubmit}>
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
                        <button className="btn" type="submit" disabled={!stripe || !clientSecret}>
                            Pay
                        </button>
                        <p className="text-red-600">{error}</p>
                        {
                            transectionId && <p className="text-green-600">Your transectionid id {transectionId}</p>
                        }
                    </form>
            }
        </>
    );
};

export default Checkout;