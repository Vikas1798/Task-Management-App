import { useRoutes } from "react-router-dom";
import PrivateSegment from "./PrivateRoute";
import { useSelector } from "react-redux";
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import { Suspense } from "react";
import HeaderComponent from "../BasicComponent/HeaderComponent";
import PageNotFound from "../BasicComponent/PageNotFound";
import UserTasks from "../Components/UserTasks";
import AppWrapper from "../BasicComponent/AppWrapper";


export default function AllRoutes() {
    const isLogIn = useSelector(d => d.user.loggedInUser);

    let routes = useRoutes([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/login",
            element: (
                <Login />
            ),
        },
        {
            path: "/signup",
            element: (
                <SignUp />
            ),
        },
        {
            path: "/tasks",
            element: (
                <UserTasks />
            ),
        },
        {
            path: "*", element: <PageNotFound />
        }
    ]);

    return (

        <div className="flex flex-col">
            <HeaderComponent />
            <AppWrapper>

                <Suspense fallback={<div> Loading... </div>}>{routes}</Suspense>
            </AppWrapper>
        </div>
    );
}

// {
//     path: "/login",
//     element: (
//         <PrivateSegment
//             isSignedIn={isLogIn}
//             component={<Login />}
//         />
//     ),
// },