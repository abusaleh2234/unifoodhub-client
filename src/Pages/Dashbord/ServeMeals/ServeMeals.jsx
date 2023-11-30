import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ServeMeals = () => {

    const axiosSecure = useAxiosSecure()
    const { data: reqMeal = [], refetch } = useQuery({
        queryKey: ["requestallMeal"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reqallmeals")
            return res.data
        }
    })

    console.log(reqMeal);

    const hendelServe = (mail) => {
        if(mail?.status === " delivered"){
            Swal.fire({
                title: "Error!",
                text: " Already served.!",
                icon: "error"
              });
        }
        axiosSecure.put(`/mealsearve/${mail._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Good job!",
                    text: "This meal is delivered!",
                    icon: "success"
                  });
                refetch()
            }
        })
    }
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Searve Meals</h2>
            <div className="">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">
                            Meal title
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Name
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
                            reqMeal.map((meal, indx) => <tr key={meal._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {indx + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 ">
                                    {meal?.name}
                                </th>
                                <td className="px-6 py-4">
                                    {meal.username}
                                </td>
                                <td className="px-6 py-4">
                                    {meal.email}
                                </td>
                                <td className="px-6 py-4">

                                    <p>{meal.status}</p>

                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => hendelServe(meal)} className="btn w-full font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Serve</button>
                                </td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;