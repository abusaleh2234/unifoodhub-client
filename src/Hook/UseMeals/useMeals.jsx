import { useEffect, useState } from "react";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useMeals = () => {
    const axiosPublic = useAxiosPublic()
    // const [meals, setMeals] = useState([])

    const {data: meals = [], refetch} = useQuery({
        queryKey: ["allmeals"],
        queryFn: async () => {
            const res = await axiosPublic.get('/meals')
            return res.data
        }
    })

    // useEffect(() => {
    //     axiosPublic.get('/meals')
    //         .then(res => setMeals(res.data))
    // }, [axiosPublic])

    return [meals, refetch]
};

export default useMeals;