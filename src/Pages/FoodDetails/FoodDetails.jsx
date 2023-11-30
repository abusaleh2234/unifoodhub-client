import { Link, useLoaderData, useParams } from "react-router-dom";
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
import React from 'react';
import Modal from 'react-modal';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const customStyles = {
    content: {
        width: "500px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white"
    },
};

// Modal.setAppElement('#yourAppElement');
const FoodDetails = () => {
    const params = useParams()
    const axiosSecure = useAxiosSecure()
    console.log(params.id);
    // const meal = useLoaderData()

    const { data: meal, refetch } = useQuery({
        queryKey: ["details", params?.id],
        queryFn: async () => {
            const res = await axios.get(`https://unifoodhub-server.vercel.app/onemeal/${params.id}`,)
            console.log(res.data);
            return res.data
        }
    })
    console.log(meal);



    const { user } = useAuth()
    // // let subtitle;
    const { _id, like, rating, price, post_time, name, meal_image, ingredients, distributor_name, details } = meal?.resultmeal || {};
    const [modalIsOpen, setIsOpen] = React.useState(false);

    console.log(rating);



    const hendelLike = () => {
        const updatelike = like + 1
        // console.log(updatelike);
        axiosSecure.put(`/userlike/${_id}`, { updatelike })
            .then(res => {
                refetch()
                console.log(res.data);
            })
    }
    const hendelmealRequest = () => {
        if (user && user?.email) {
            const reqestmeal = {
                mealId: _id,
                name: name,
                email: user.email,
                username: user.displayName,
                meal_image: meal_image,
                price: price,
                status: "pending",
                like: like,
                reviews: meal.resultreview?.length
            }
            axiosSecure.post("/mealsRequest", reqestmeal)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
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
        else {
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

    const hendelreview = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const details = form.details.value

        const review = {
            name,
            email,
            author_name: user.displayName,
            mealId: _id,
            reviews_details: details,
            author_img: user.photoURL,
            like: like,
            reviews: meal.resultreview?.length
        }

        axiosSecure.post("/review", review)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {

                    Swal.fire({
                        title: "Good job!",
                        text: "Your review successfull!",
                        icon: "success"
                    });
                    refetch()
                }
            })
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Container>
            <div className="md:flex items-center rounded-xl bg-base-100">
                <figure className="md:w-5/12"><img className="h-full w-full" src={meal_image} alt="Meal" /></figure>
                <div className="card-body md:w-7/12">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <h4 className="text-xl">Distributor name: {distributor_name}</h4>
                    <p className="text-sm">{details}</p>
                    <p>Ingredients :{ingredients}</p>
                    <p>Post Time: {post_time}</p>
                    <div className="flex justify-between items-center">
                        <p className='text-3xl font-bold text-[#f01543]'>${price}</p>
                        {
                            rating && <div className="flex items-center ">
                                <Rating
                                    style={{ maxWidth: 160 }}
                                    value={rating}
                                    readOnly
                                /> <p className='text-2xl font-bold'>({rating})</p>
                            </div>
                        }
                    </div>
                    <div className="card-actions justify-between">
                        <button onClick={hendelLike} className="btn text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"><span className="text-3xl"><BiLike /></span>({like})</button>
                        <div>
                            <button onClick={openModal} className="btn text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"><span className="">Review</span></button>
                            {/* <button >Open Modal</button> */}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">Review </h2>
                                    <button onClick={closeModal} className="btn-circle btn">X</button>
                                </div>
                                <form onSubmit={hendelreview} className="space-y-4">
                                    <div className="">
                                        <label className='text-sm mb-2'>
                                            Meal Name
                                        </label>
                                        <input type='text' defaultValue={name} name='name' placeholder='meal name' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                            required />
                                    </div>
                                    <div className="">
                                        <label className='text-sm mb-2'>
                                            User email
                                        </label>
                                        <input type='text' defaultValue={user?.email} name='email' required placeholder='email' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                        />
                                    </div>
                                    <div className="">
                                        <label className='text-sm mb-2'>
                                            Details
                                        </label>
                                        <textarea name="details" className="w-full textarea textarea-bordered h-24" placeholder="details" required />
                                    </div>
                                    <button className="btn w-full  text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Review</button>
                                </form>
                            </Modal>
                        </div>
                        {
                            user ? <button onClick={hendelmealRequest} className="btn  text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Meal Request</button>
                            : <Link to="/login" className="btn  text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"> Meal Request</Link>
                        }
                    </div>
                </div>
            </div>

            <div className="">
                <>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {
                            meal?.resultreview?.map(review => <SwiperSlide key={review._id}>
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