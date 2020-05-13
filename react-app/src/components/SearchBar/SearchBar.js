import React from 'react';
import './search.css';

function SearchBar(){
    return(
        <div class="search__container">
        <p class="search__title">
            A YouTube party application to watch videos together
        </p>
        <input class="search__input" type="text" placeholder="Enter YouTube Link" >
            
        </input>
        </div>
    );
}

export default SearchBar;