import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/unifoodhub-high-resolution-logo-transparent.png"
import UseAdmin from "../../Hook/useAdmin/UseAdmin";
import useAuth from "../../Hook/useAuth";

const Dashbord = () => {
    const [isAdmin, isLoading] = UseAdmin()
    const {user,looding} = useAuth()
    console.log(isAdmin);
    if (isLoading || looding) {
        return <h3>Looding...</h3>
    }
    return (
        <div className="flex">
            <div className="w-1/5 bg-[#000929] min-h-screen px-6">
                <img src={logo} alt="" />
                <div className="">
                    <ul>
                        {
                            isAdmin?.admin ? <>

                                <li><NavLink
                                    to="/dashbord/adminprofile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    Admin Profile
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/manageuser"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    Manage User
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/addmeal"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    Add Meal
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/allmeals"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    All Meals
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/allreviews"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    All Reviews
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/servemeals"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    Serve Meals
                                </NavLink></li>
                                <li><NavLink
                                    to="/dashbord/upcomeing"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                    }
                                >
                                    Upcomeing Meals
                                </NavLink></li>
                            </>
                                : <>

                                    <li><NavLink
                                        to="/dashbord/profile"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium  py-5" : "text-lg font-medium text-[#787d8e]"
                                        }
                                    >
                                        My Profile
                                    </NavLink></li>
                                    <li><NavLink
                                        to="/dashbord/reqmeals"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                        }
                                    >
                                        Requested Meals
                                    </NavLink></li>
                                    <li><NavLink
                                        to="/dashbord/myreviews"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                                        }
                                    >
                                        My Reviews
                                    </NavLink></li>
                                </>
                        }

                        <span className="border-b-2 border-slate-400"></span>

                        <li><NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                            }
                        >
                            Home
                        </NavLink></li>
                        <li><NavLink
                            to="/meals"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#f01543] text-lg font-medium py-5" : "text-lg font-medium text-[#787d8e]"
                            }
                        >
                            All Meals
                        </NavLink></li>

                    </ul>
                </div>
            </div>
            <div className="w-4/5 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashbord;