import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import Allmeals from "../Pages/AllMeals/Allmeals";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Dashbord from "../Layout/Dashbord/Dashbord";
import Myprofile from "../Pages/Dashbord/Myprofile/Myprofile";
import ReqMeals from "../Pages/Dashbord/ReqMeals/ReqMeals";
import Myreview from "../Pages/Dashbord/Myreview/Myreview";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ManageUser from "../Pages/Dashbord/Manageuser/ManageUser";
import Adminprofile from "../Layout/Dashbord/AdminProfile/Adminprofile";
import AddMeal from "../Layout/Dashbord/Addmeal/AddMeal";
import AdminAllmeals from "../Pages/Dashbord/AdminAllMeals/AdminAllmeals";
import Updatemeal from "../Pages/Dashbord/UpdateMeal/Updatemeal";
import AllReviews from "../Pages/Dashbord/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashbord/ServeMeals/ServeMeals";
import Payment from "../Pages/Dashbord/Payment/Payment";
import Error from "../Component/ErrorPage/Error";
import Upcoming from "../Pages/Dashbord/Upcomeing/Upcoming";
import AdminRoute from "./AdminRoute/AdminRoute";
import EditReview from "../Pages/Dashbord/EditReview/EditReview";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    errorElement: <Error></Error>,
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
          element:<FoodDetails></FoodDetails>
          // loader: ({params}) => fetch(`https://unifoodhub-server.vercel.app/meals/${params.id}`)
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
  },
  {
    path: "/dashbord",
    element: <PrivateRoute><Dashbord></Dashbord></PrivateRoute>,
    errorElement: <Error></Error>,
    children: [
      // Admin Route
      {
        path: "/dashbord/adminprofile",
        element: <Adminprofile></Adminprofile>
      },
      {
        path: "/dashbord/manageuser",
        element: <ManageUser></ManageUser>
      },
      {
        path: "/dashbord/addmeal",
        element: <AddMeal></AddMeal>
      },
      {
        path: "/dashbord/allmeals",
        element: <AdminAllmeals></AdminAllmeals>
      },
      {
        path: "/dashbord/updatemeal/:id",
        element: <Updatemeal></Updatemeal>
      },
      {
        path: "/dashbord/allreviews",
        element: <AllReviews></AllReviews>
      },
      {
        path: "/dashbord/servemeals",
        element: <ServeMeals></ServeMeals>
      },
      {
        path: "/dashbord/upcomeing",
        element: <AdminRoute><Upcoming></Upcoming></AdminRoute>
      },
      // user route
      {
        path: "/dashbord/profile",
        element: <Myprofile></Myprofile>
      },
      {
        path: "/dashbord/reqmeals",
        element: <ReqMeals></ReqMeals>
      },
      {
        path: "/dashbord/myreviews",
        element: <Myreview></Myreview>
      },
      {
        path: "/dashbord/editreview/:id",
        element: <EditReview></EditReview>,
      },
      {
        path: "/dashbord/payment/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ]
    }
  ]);