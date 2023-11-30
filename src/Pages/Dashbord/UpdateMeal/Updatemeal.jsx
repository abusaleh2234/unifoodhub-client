import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../Hook/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Updatemeal = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const param = useParams()

    console.log(param);
    const { data: meal } = useQuery({
        queryKey: ["updatemeal"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mealitem/${param.id}`)
            return res.data
        }
    })

    console.log(meal);


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

        const updatemeal = {
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

        console.log(meal._id);
        axiosSecure.put(`/mealupdate/${meal._id}`, updatemeal)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Meal Update successfully!",
                        icon: "success"
                    });
                }
            })

    };
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Update Meal</h2>

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-4  items-center justify-center'>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Meal title
                            </label>
                            <input
                                type='text' name='name'
                                defaultValue={meal?.name}
                                {...register("name")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <select defaultValue={meal?.category} {...register("category")} className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900">
                                <option disabled >Select a category</option>
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
                                type='text'
                                defaultValue={meal?.ingredients}
                                {...register("ingredients")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Description
                            </label>
                            <input
                                type='text'
                                defaultValue={meal?.details}
                                {...register("description")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Price
                            </label>
                            <input
                                type='text' required
                                defaultValue={meal?.price}
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
                                type='text' required
                                defaultValue={meal?.rating}
                                {...register("rating")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label className='text-sm mb-2'>
                                    Post time
                                </label>
                            </div>
                            <input
                                type='date'
                                defaultValue={meal?.post_time}
                                {...register("time")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Likes
                            </label>
                            <input
                                type='text'
                                defaultValue={meal?.like}
                                {...register("likes")}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm'>
                                Reviews
                            </label>
                            <input
                                type='text'
                                defaultValue={meal?.reviews.length}
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
                                type='text'
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
                                type='email'
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
                                type='file' id='image' name='image' accept='image/*'
                                {...register("image")}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='btn w-full text-lg font-semibold border transition duration-300 hover:bg-white border-[#f01543] hover:border-[#f01543] bg-[#f01543] text-white hover:text-[#f01543]'
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updatemeal;
