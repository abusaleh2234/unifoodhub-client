import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../../Hook/useAdmin/UseAdmin";
import useAuth from "../../Hook/useAuth";

const AdminRoute = ({children}) => {

    const [isAdmin, isLoading] = UseAdmin()
    const {user, looding} = useAuth()
    const location = useLocation()

    if(isLoading || looding){
        return <div className="w-full flex justify-center">
        <span className="loading loading-spinner loading-lg "></span>
    </div>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to="/login" state={location?.pathname} />
};

export default AdminRoute;