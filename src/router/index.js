import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import {Navigate} from "react-router-dom";
import Error from "../pages/Error";

export const routes = [
    {path: "/about", element: <About/>},
    {path: "/persons", element: <Posts/>},
    {path: "/persons/:id", element: <PostIdPage/>},
    {path: "/error", element: <Error/>},
    {path: "/", element: <Navigate replace to='/persons' />},
    {path: "/*", element: <Navigate replace to='/error' />},
    ]