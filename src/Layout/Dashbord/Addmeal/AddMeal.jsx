import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddMeal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

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

        const meal = {
            name: data.name,
            distributor_name: user?.displayName,
            category: data.category,
            meal_image: result.data.data.display_url,
            details: data.description,
            ingredients: data.ingredients,
            post_time: data.time,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            like: parseInt(data.likes),
            email: user?.email,
            reviews: parseInt(data.Reviews)
        }

        axiosSecure.post("/addmeal", meal)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "Meal add successfully!",
                    icon: "success"
                  });
            }
        })

    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Add Meal</h2>

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-4  items-center justify-center'>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Meal title
                            </label>
                            <input
                                type='text' name='name' placeholder='Enter Your Name Here'
                                {...register("name")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <select defaultValue={"default"} placeholder="Category" {...register("category")} className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900">
                                <option disabled value="default">Select a category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>
                                    Ingredients
                                </label>
                            </div>
                            <input
                                type='text' id='password' required placeholder='Ingredients'
                                {...register("ingredients")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Description
                            </label>
                            <input
                                type='text' placeholder='Description'
                                {...register("description")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Price
                            </label>
                            <input
                                type='text' required placeholder='Price'
                                {...register("price")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>
                                    Rating
                                </label>
                            </div>
                            <input
                                type='text' required placeholder='Rating'
                                {...register("rating")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Post time
                                </label>
                            </div>
                            <input
                                type='date' required placeholder='post time'
                                {...register("time")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Likes
                            </label>
                            <input
                                type='text' placeholder='Likes'
                                {...register("likes")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Reviews
                            </label>
                            <input
                                type='text' required placeholder='Reviews'
                                {...register("Reviews")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>
                                    Distributor Name
                                </label>
                            </div>
                            <input
                                type='text' required placeholder='distributor Name'
                                readOnly
                                defaultValue={user?.displayName}
                                {...register("distributor_name")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Distributor Email
                            </label>
                            <input
                                type='email' required placeholder='distributor Email'
                                readOnly
                                defaultValue={user?.email}
                                {...register("distributor_email")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required type='file' id='image' name='image' accept='image/*'
                                {...register("image")}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='btn w-full text-lg font-semibold border transition duration-300 hover:bg-white border-[#f01543] hover:border-[#f01543] bg-[#f01543] text-white hover:text-[#f01543]'
                        >
                            Add Meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;