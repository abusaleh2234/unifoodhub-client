import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/AxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";

const Membership = () => {

    const axiosPublic = useAxiosPublic()

    const [memberships, setMemberShip] = useState()

    useEffect(() => {
        axiosPublic.get("/membership")
            .then(res => setMemberShip(res.data))
    }, [axiosPublic])
    console.log(memberships);
    return (
        <div className="py-10">
            <h2 className="text-4xl font-bold text-center pb-5">Get Paid Membership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {
                    memberships?.map(membership => <div key={membership._id} className="group">
                        <div className="text-center border-2 pb-4 group-hover:bg-[#f01543] hover:text-white transition duration-500 space-y-6 flex flex-col">
                            <h3 className="text-xl font-semibold py-3 text-center transition duration-300  group-hover:bg-[#f01543]  bg-gray-300">{membership.name}</h3>
                            <div className="px-4 space-y-3">
                                <div className=" flex justify-center  ">
                                    <span className="text-xl font-bold text-white bg-rose-400 p-6 rounded-full">
                                        ${membership.price}</span>
                                </div>
                                <p className="flex-grow">{membership.details}</p>
                                <Link to={`/dashbord/payment/${membership._id}`} className="btn bg-[#f01543] text-white group-hover:text-[#f01543] group-hover:bg-white">Join Now</Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default Membership;