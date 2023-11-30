/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hook/useAuth";


const PrivateRoute = ({children}) => {

    const {user, looding} = useAuth()
    const location = useLocation()

    // console.log(looding);
    if(looding){
        return <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-lg "></span>
        </div>
    }

    if(user){
        return children
    }
    return <Navigate to="/login" state={location?.pathname} replace/>
};

export default PrivateRoute;