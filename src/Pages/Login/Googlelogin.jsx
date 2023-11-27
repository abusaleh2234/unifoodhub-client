import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";

const Googlelogin = () => {

    const {googleLogin} = useAuth()
    const axiosPublic = useAxiosPublic()

    const hendelGoogleLogin = () => {
        googleLogin()
        .then(res => {
            console.log(res.data);
            const userInfo = {
                email: res.user.email,
                name: res.user.displayName,
                image: res.user.photoURL,
                subscription: ""
            }

            axiosPublic.post("/users", userInfo)
            .then(res => {
                console.log(res.data);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
            <div className="md:px-20">
                <button onClick={hendelGoogleLogin} type="button" className="w-full flex items-center gap-4 justify-center text-gray-900 text-base rounded-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><span className='text-2xl'><FcGoogle /></span>Continue with Google</button>
            </div>
        </div>
    );
};

export default Googlelogin;