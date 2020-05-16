import React,{useState} from 'react';
import DisplayImage from '../assets/image.svg';
import {BrowserRouter as Router, Route,Link,useParams,useHistory,Switch} from 'react-router-dom';
import './search.css';
import { uuid } from 'uuidv4';


function Landing(props){
    const [url,setURL] = useState('');
    const history = useHistory();
    console.log('history:',history);

    const parseURL = (url)=>{
        console.log('url:',url);
        
        const val = (url.url).match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        console.log("val: " + val);
        if(url.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/) || url == ""){
            console.log("success: " + val);

            return val[1];
        }
    console.log('url:',url);
    
    }
    const youtubeParser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = (url.url).match(regExp);
        console.log(match);
        return match && match[7].length === 11 ? match[7] : false;
};


    const sessionID = uuid().slice(0, 6);
    const onSubmit = (e)=>{
        e.preventDefault();
        var url_id = youtubeParser(url);
        props.session(url_id, sessionID, true);
        if (!url_id) {
            return;
          }
        history.push('/video/host');
       
        console.log('history:',history);
        return;
        
    }
    return (
            <div className="container">
                <img src={DisplayImage} height='200px' width='200px'></img>
                
                <div class="search__container">
                <p class="search__title">
                    Watch videos in sync with friends
                </p>
                <form onSubmit={onSubmit}>
                <input class="search__input" type="text" onChange={e=> setURL({url: e.target.value})} placeholder="Enter YouTube Link" >
                </input>
                ><button type='submit'  class="search_submit">Watch Now</button>
                </form>
                </div>
                
                
            </div>
        );
}


export default Landing;