import { Link } from "react-router-dom";
import Googlelogin from "./Googlelogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";



const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()

    const { createUser } = useAuth()
    const onSubmit = async data => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const result = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(result.data);
        console.log(result.data.data.display_url);

        createUser(data.email, data.password)
            .then(async res => {
                console.log(res.user);

                updateProfile(auth.currentUser, {
                    displayName: data.name, photoURL: result.data.data.display_url
                }).then(() => {
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
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch(err => {
                console.log(err);
            })
    };
    return (
        <div className='flex justify-center items-center w-6/12 mx-auto min-h-screen'>
            <div className='flex flex-col w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                {...register("name")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                {...register("email")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
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
                                autoComplete='new-password'
                                id='password'
                                required
                                placeholder='*******'
                                {...register("password")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                {...register("image")}
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
                <div className="divider py-4">OR</div>

                <Googlelogin></Googlelogin>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 font-bold text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;