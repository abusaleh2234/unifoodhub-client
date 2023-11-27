import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';


const FoodCard = ({ meal }) => {
    const { name, price, rating, meal_image,_id } = meal;
    const location = useLocation()
    console.log(location);
    const {user} = useAuth()
    return (
        <div className="card  bg-base-100 group">
            <figure><img className='w-full h-[270px] duration-300  transition group-hover:scale-110' src={meal_image} alt="Shoes" /></figure>
            <div className="card-body space-y-2">
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
                <div className="bg-gray-200 p-[1px]"></div>
                <h2 className="card-title">{name}</h2>

                <div className="card-actions justify-center">
                <Link to={`/fooddetails/${_id}`} className="btn w-full text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Details</Link>
                    {/* {
                        user?.email ? <Link to={`/fooddetails/${_id}`} className="btn w-full text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Details</Link> :
                        <Navigate state={location.pathname} to="/login"/>
                    } */}
                </div>
            </div>
        </div>
    );
};

export default FoodCard;