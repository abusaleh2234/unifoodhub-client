import { Link } from "react-router-dom";
import useMeals from "../../../Hook/UseMeals/useMeals";
import { FaEdit } from "react-icons/fa";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllmeals = () => {

    const [meals, refetch] = useMeals()
    console.log(meals);
    const axiosSecure = useAxiosSecure()

    const hendelMealDelete = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletemeal/${id}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.deletedCount > 1 ){
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
            <h2 className="text-4xl font-bold text-center">All Meals</h2>
            <div className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">
                                Meal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Likes 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Reviews 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                 Name/Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Update
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Delete
                                </th>
                                <th scope="col" className="px-6 py-3">
                                View Meal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                meals.map((meal, indx) =>  <tr key={meal._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {indx +1}
                                </td>
                                <th scope="row" className="px-6 py-4 ">
                                 {meal.name}
                                </th>
                                <td className="px-6 py-4">
                                    {meal.like}
                                </td>
                                <td className="px-6 py-4">
                                    {meal.review}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="">
                                        <p>{meal.distributor_name}</p>
                                        <p> {meal.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/dashbord/updatemeal/${meal._id}`}><AwesomeButton className="bg-[#f01543]" type="primary"><FaEdit className="text-lg"/></AwesomeButton></Link>
                                
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => hendelMealDelete(meal._id)} className="btn w-full font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"> <RiDeleteBin6Line className="text-lg "/></button>
            
                                </td>
                                <td className="px-6 py-4">
                                <Link to={`/fooddetails/${meal._id}`} className="btn w-full font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Details</Link>

                                </td>
                            </tr>)
                                
                            }

                        </tbody>
                    </table>
            </div>
        </div>
    );
};

export default AdminAllmeals;