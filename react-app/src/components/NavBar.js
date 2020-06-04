import React from 'react';
import {useHistory} from 'react-router-dom';

import './nav.css';
import YTLogo from '../assets/yt-dark.jpg';

function NavBar(){
    const history = useHistory();
    const imageClick=()=>{
        history.push('/');
    }
return(
    
    <nav>
        <img src={YTLogo} onClick={() => imageClick()}></img>
        <h1 className='nav-title'>Watch Party</h1>
    </nav>
);
}

export default NavBar;