import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const Adminprofile = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [admindata, setAdminData] = useState()
    useEffect(() => {
        axiosSecure.get(`/auser?email=${user?.email}`)
            .then(res => {
                setAdminData(res.data);
            })
    }, [axiosSecure, user])
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">MY Profile</h2>
            <div className="w-full flex justify-center pt-10">
                <div className="relative border-2 inline-block p-20 text-center space-y-4 py-5">
                    <div className="">
                        <img className="rounded-full" src={admindata?.image} alt="" />
                        <img className="w-1/5 absolute top-0 right-0" src={admindata?.badge} alt="" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-semibold ">{admindata?.name}</h3>
                        <p className="font-medium">{admindata?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminprofile;