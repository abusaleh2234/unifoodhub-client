import { useEffect, useState } from "react";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";


const useMeals = () => {
    const axiosPublic = useAxiosPublic()
    const [meals, setMeals] = useState([])

    useEffect(() => {
        axiosPublic.get('/meals')
            .then(res => setMeals(res.data))
    }, [axiosPublic])

    return [meals]
};

export default useMeals;