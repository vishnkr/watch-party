import React from 'react';


import './nav.css';
import YTLogo from '../assets/yt-dark.jpg';

function NavBar(){
return(
    <nav>
        <img src={YTLogo}></img>
        <h1 className='nav-title'>Watch Party</h1>
    </nav>
);
}

export default NavBar;