import { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";


const Myprofile = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [userdata, setUserData] = useState()

    useEffect(() => {
        axiosSecure.get(`/auser?email=${user?.email}`)
            .then(res => {
                setUserData(res.data);
            })
    }, [axiosSecure, user])
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">MY Profile</h2>
            <div className="w-full flex justify-center pt-10">
                <div className="relative border-2 inline-block p-20 text-center space-y-4 py-5">
                    <div className="">
                        <img className="rounded-full" src={userdata?.image} alt="" />
                        <img className="w-1/5 absolute top-0 right-0" src={userdata?.badge} alt="" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-semibold ">{userdata?.name}</h3>
                        <p className="font-medium">{userdata?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Myprofile;