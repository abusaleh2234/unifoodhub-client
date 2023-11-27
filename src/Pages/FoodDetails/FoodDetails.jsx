import { useLoaderData } from "react-router-dom";
import Container from "../../Component/Container/Container";
import { BiLike } from "react-icons/bi";
import { Rating } from "@smastrom/react-rating";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useAxiosSecure from "../../Hook/AxiosSecure/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";


const FoodDetails = () => {
    const meal = useLoaderData()
    const {user} =useAuth()
    const axiosSecure = useAxiosSecure()
    const { _id, reviews, rating, price, post_time, name, meal_image, ingredients, distributor_name, details } = meal;
    console.log(meal);

    const hendelmealRequest = () => {
        if(user && user?.email){
            const reqestmeal = {
                mealId: _id,
                name: name,
                email: user.email,
                meal_image: meal_image,
                status: "pending",
                like: 0,
                reviews:0
            }
            axiosSecure.post("/mealsRequest",reqestmeal)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} meal request confirm`,
                        showConfirmButton: false,
                        timer: 2500
                      });
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not logged in?",
                text: "please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    // navigate("/login", { state: { from: location } })

                }
            });
        }
    }
    return (
        <Container>
            <div className="flex items-center rounded-xl bg-base-100">
                <figure className="w-5/12 h-full"><img className="" src={meal_image} alt="Meal" /></figure>
                <div className="card-body w-7/12">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <h4 className="text-xl">Distributor name: {distributor_name}</h4>
                    <p className="text-sm">{details}</p>
                    <p>Ingredients :{ingredients.map((i, indx) => <span key={indx} className="px-3 font-semibold">{i}</span>)}</p>
                    <p>Post Time: {post_time}</p>
                    <div className="flex justify-between items-center">
                        <p className='text-3xl font-bold text-[#f01543]'>${price}</p>
                        <div className="flex items-center ">
                            <Rating
                                style={{ maxWidth: 160 }}
                                value={rating}
                                readOnly
                            /> <p className='text-2xl font-bold'>({rating})</p>
                        </div>
                    </div>
                    <div className="card-actions justify-between">
                        <button className="btn text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"><span className="text-3xl"><BiLike /></span></button>
                        <button onClick={hendelmealRequest} className="btn  text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="">
                <>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {
                            reviews.map(review => <SwiperSlide key={review.author_name}>
                                <div className="text-center w-10/12 mx-auto space-y-2">
                                    <div className="flex justify-center">
                                    <img className="w-28 h-28 rounded-full" src={review.author_img} alt="" />
                                    </div>
                                    <p>{review.reviews_details}</p>
                                    <h2 className="text-2xl font-bold">{review.author_name}</h2>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </>
            </div>
        </Container>
    );
};

export default FoodDetails;