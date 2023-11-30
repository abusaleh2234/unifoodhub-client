import { NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import UseAdmin from "../../Hook/useAdmin/UseAdmin";

const Navbar = () => {

    const { user, logOut } = useAuth()
    const [isAdmin, isLoading] = UseAdmin()

    const hendelSignOut = () => {
        logOut()
    }

    console.log(user);
    const menus = <>
        <li><NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#f01543] font-semibold  border-b-2	px-3 py-5" : ""
            }
        >
            Home
        </NavLink></li>
        <li>
            <NavLink
                to="/meals"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#f01543] font-semibold  border-b-2	px-3 py-5" : ""
                }
            >
                All Meals
            </NavLink>
        </li>

        <li> 
            <NavLink to="/dashbord/upcomeing"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#f01543] font-semibold  border-b-2	px-3 py-5" : "relative text-center"
            } type="button">
                <span className="">Upcoming Meals</span>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-3 -right-2 dark:border-gray-900">+0</div>
            </NavLink></li>
        {/* -end-1 */}
        <li>
            {
                user?.email ? <div className="flex items-center">
                   
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="user photo" src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-black">
                            <li>
                                {
                                    user?.displayName
                                }
                            </li>
                            <li><NavLink
                                to={isAdmin ? "/dashbord/adminprofile" : "/dashbord/profile"}
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#f01543] font-semibold  border-b-2	px-3 py-5" : ""
                                }
                            >
                                Dashbord
                            </NavLink></li>
                            <li><button onClick={hendelSignOut} className="">Sign Out</button></li>
                            
                        </ul>
                    </div>
                </div> :
                    <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-[#f01543] font-semibold  border-b-2	px-3 py-5" : ""
                        }
                    >
                        Join Us
                    </NavLink>
            }
        </li>
    </>
    return (
        <div className="navbar bg-white text-black bg-opacity-60 shadow-xl max-w-[1920px]">
            <div className="navbar-start">
                
                <a className="btn btn-ghost text-xl"> UniFoodHub</a>
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menus}
                    </ul>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="flex items-center gap-3 px-1">
                    {
                        menus
                    }
                </ul>
            </div>
            {/* <div className="">
            {
                user ? <button className="btn">Log Out</button> : <button className="btn">Login</button>
            }
        </div> */}
        </div>
    );
};

export default Navbar;