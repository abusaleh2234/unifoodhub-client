import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import useAuth from "../useAuth";


const UseAdmin = () => {

    const {user,looding} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin, isLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            return res.data
        }
    })
    console.log(isAdmin);

    return [isAdmin, isLoading]
};

export default UseAdmin;