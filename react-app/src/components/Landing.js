import React,{Component} from 'react';
import DisplayImage from '../assets/image.svg';
import SearchBar from './SearchBar/SearchBar';

class Landing extends Component {
    
    render() {
        return (
            <div className="container">
                <img src={DisplayImage} height='200px' width='200px'></img>
                <SearchBar />
            </div>
        );
    }
}

export default Landing;