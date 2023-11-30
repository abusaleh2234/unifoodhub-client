import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ReqMeals = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: requestedMeals, refetch } = useQuery({
        queryKey: ["mealreq"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/maelreq/${user?.email}`)
            return res.data
        }
    })

    const price = requestedMeals?.reduce((total, item) => total + item.price,0)
    console.log(requestedMeals);

    const hendelCancel = (id) => {
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
                axiosSecure.delete(`/malecancel/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.deletedCount > 0){
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
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Requseted Meals</h2>
            <div className="">


                <div className="relative overflow-x-auto">
                    <div className="flex justify-around items-center">
                        <p className="text-xl font-semibold">Total order {requestedMeals?.length}</p>
                        <p className="text-xl font-semibold">Total Price ${price}</p>
                        {/* {
                            requestedMeals?.length  > 0 ? <Link to="/dashbord/payment" className="btn">Pay</Link > : 
                            <button disabled className="btn">Pay</button> 
                        } */}
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Meal Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Review
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Like
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requestedMeals?.map((meal, indx) => <tr key={meal._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {indx + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 ">
                                        {meal.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        Review ({meal.reviews})
                                    </td>
                                    <td className="px-6 py-4">
                                        Like ({meal.like})
                                    </td>
                                    <td className="px-6 py-4">
                                        {meal.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => hendelCancel(meal._id)} className="btn">Cancel</button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ReqMeals;