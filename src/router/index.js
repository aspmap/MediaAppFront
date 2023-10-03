import About from "../pages/About";
import Persons from "../pages/Persons";
import PersonInfo from "../pages/PersonInfo";
import {Navigate} from "react-router-dom";
import Error from "../pages/Error";
import Projects from "../pages/Projects";
import Works from "../pages/Works";
import MediaInfo from "../pages/MediaInfo";

export const routes = [
    {path: "/about", element: <About/>},
    {path: "/persons", element: <Persons/>},
    {path: "/personinfo/:id", element: <PersonInfo/>},
    {path: "/projects/:personId", element: <Projects/>},
    {path: "/works/:projectId", element: <Works/>},
    {path: "/mediainfo/:workId", element: <MediaInfo/>},
    {path: "/error", element: <Error/>},
    {path: "/", element: <Navigate replace to='/persons' />},
    {path: "/*", element: <Navigate replace to='/error' />},
    ]