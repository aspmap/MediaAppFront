import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/about" style={{paddingRight: 10}}>О сайте</Link>
                <Link to="/persons">Персоны</Link>
            </div>
        </div>
    );
};

export default Navbar;