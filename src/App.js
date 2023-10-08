import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import NavbarLeft from "./components/UI/navbar/NavbarLeft";

function App() {
    return (
        <BrowserRouter>
            <NavbarLeft/>
            <br/><br/><br/><br/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
