import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import Allmeals from "../Pages/AllMeals/Allmeals";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element:<Home></Home>
        },
        {
          path: "/meals",
          element: <Allmeals></Allmeals>
        },
        {
          path: "/fooddetails/:id",
          element: <FoodDetails></FoodDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`)
        }
      ]
    },
    {
      path:"/login",
      element: <Login></Login>
    },
    {
      path: "/signup",
      element: <SignUp></SignUp>
    }
  ]);