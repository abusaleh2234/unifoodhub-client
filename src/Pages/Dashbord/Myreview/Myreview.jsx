import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import React from "react";
import EditReview from "../EditReview/EditReview";
import { Link } from "react-router-dom";


const Myreview = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: reviews, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure(`/userreview?email=${user.email}`)
            return res.data
        }
    })
    console.log(reviews);
    // const [modalIsOpen, setIsOpen] = React.useState(false);

   

    const hendelDeletReview = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to Cancel this Meal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletereview/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });

    }

    const hendelreviewEdit = (e,review) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const details = form.details.value

        const updatereview = {
            name,
            email,
            author_name: user.displayName,
            reviews_details: details,
            author_img: user.photoURL,
        }

        axiosSecure.put(`/updatereview/${review._id}`, updatereview)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {

                    Swal.fire({
                        title: "Good job!",
                        text: "Your review successfull!",
                        icon: "success"
                    });
                    refetch()
                }
            })
    }

    
    return (
        <div>
            <h2 className="text-4xl font-bold text-center py-8">My Review</h2>
            <div className="">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Meal name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Like
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.map((reviow, indx) => < tr key={reviow._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {indx + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 ">
                                    {reviow.name}
                                </th>
                                <td className="px-6 py-4">
                                    Likes({reviow.like})
                                </td>
                                <td className="px-6 py-4">
                                    Reviews({reviow.reviews})
                                </td>
                                <td className="px-6 py-4">
                                        <EditReview user={user} review={reviow && reviow} hendelreviewEdit={hendelreviewEdit}></EditReview>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => hendelDeletReview(reviow._id)} className="btn">Delete</button>
                                </td>
                            </tr>)

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Myreview;