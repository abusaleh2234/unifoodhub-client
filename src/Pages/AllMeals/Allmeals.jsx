import { useEffect, useState } from "react";
import Container from "../../Component/Container/Container";
import FoodCard from "../../Component/FoodCard/FoodCard";
import useMeals from "../../Hook/UseMeals/useMeals";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";

const Allmeals = () => {
    const [meals] = useMeals()
    const [search, setsearch] = useState('')
    const axiosPublic = useAxiosPublic()
    const [searchvalue, setsearchvalue] = useState([...meals])
    useEffect(() => {
        axiosPublic.get(`/searchmeals?search=${search}`)
        .then(res => setsearchvalue(res.data))
    },[axiosPublic,search])

    const hendelSearch = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        setsearch(search);
    }
    return (
        <Container>
            <div className="">
                <form onSubmit={hendelSearch} className="md:w-1/3 mx-auto pt-10">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        </div>
                        <input type="search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none rounded-lg bg-white outline-1 border-2 bg-opacity-50 " placeholder="Search Mockups, Logos..."  />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                    {
                        searchvalue.map(meal => <FoodCard key={meal._id} meal={meal}></FoodCard>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default Allmeals;