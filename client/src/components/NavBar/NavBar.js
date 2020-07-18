import React from 'react';
import {useHistory,Link} from 'react-router-dom';

import './nav.css';

function MainLogo () {
    
    return(
    <div className="logoContainer">
        <h6 onClick={null}>
            <span className="primaryColor">WATCH </span>
            <span className="secondaryColor"> PARTY</span>
        </h6>
    </div>
    );
    }

function NavBar(){
    const history = useHistory();
    const imageClick=()=>{
        history.push('/');
    }
return(
    
    <nav>
        <MainLogo />
    </nav>
);
}

export default NavBar;