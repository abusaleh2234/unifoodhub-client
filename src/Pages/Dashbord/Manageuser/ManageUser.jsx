import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAdmin from "../../../Hook/useAdmin/UseAdmin";

const ManageUser = () => {

    const axiosSecure = useAxiosSecure()
    const [isAdmin, isLoading] = UseAdmin()
    const { data: users,refetch } = useQuery({
        queryKey: ["alluser"],
        queryFn: async () => {
            const res = await axiosSecure.get("/alluser")
            return res.data
        }
    })
    console.log(users);

    const hendelMakeAdmin = (id) => {
        axiosSecure.patch(`/adadmin/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
                refetch()
            }
        })
    }
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Manage Uaers</h2>
            <div className="">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Make admin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, indx) => <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {indx + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 ">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        isAdmin ? user.role ? "Admin" : <button onClick={() => hendelMakeAdmin(user._id)} className="btn"><FaUsers className="text-2xl"/></button> : 
                                        <button disabled className="btn"><FaUsers className="text-2xl"/></button>
                                    }
                                    {}
                                </td>
                                <td className="px-6 py-4">
                                    {user.subscription}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;