import { Link, useLocation, useNavigate } from "react-router-dom";
import Googlelogin from "./Googlelogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";



const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate =useNavigate()
    console.log(location);
    const {user,loginUser} = useAuth()
    // const {loginUser} = useContext(AuthContext)
    const onSubmit = data => {
        console.log(data)
        loginUser(data.email, data.password)
        .then(res => {
            console.log(res.user);
            navigate(location?.state ? location?.state : "/")
        })
        .catch(err => {
            console.log(err);
        })

    };
    return (
        <div className='flex justify-center items-center md:w-6/12 mx-auto min-h-screen'>
            <div className='flex flex-col w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 ng-untouched ng-pristine ng-valid'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                required
                                placeholder='Enter Your Email Here'
                                {...register("email")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                required
                                placeholder='*******'
                                {...register("password")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='btn w-full text-lg font-semibold border transition duration-300 hover:bg-white border-[#f01543] hover:border-[#f01543] bg-[#f01543] text-white hover:text-[#f01543]'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                    <div className="divider">OR</div>
                <Googlelogin></Googlelogin>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 font-bold text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;