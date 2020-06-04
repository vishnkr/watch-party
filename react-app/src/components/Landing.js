import React,{useState,useEffect} from 'react';
import DisplayImage from '../assets/image.svg';
import {useHistory} from 'react-router-dom';
import './search.css';
import { uuid } from 'uuidv4';
import socketIOClient from 'socket.io-client';

function Landing(props){
    const [url,setURL] = useState('');
    const [response,setResponse] = useState('');
    const history = useHistory();
    console.log('history:',history);

    const youtubeParser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = (url.url).match(regExp);
        console.log(match);
        return match && match[7].length === 11 ? match[7] : false;
};
    const onSubmit = (e)=>{
        e.preventDefault();
        var url_id = youtubeParser(url);
        const sessionID = uuid().slice(0, 6);
        console.log("landing props:",props);
        console.log('sessid',sessionID,"urlid:",url_id);
        props.session(url_id, sessionID, true);
        if (!url_id) {
            return;
          }
        history.push('/watch/host/'+url_id);
        console.log('history:',history);
        
        return;
        
    }
    useEffect(() => {
        const socket = socketIOClient("localhost:8000");
        socket.on("FromAPI", data => {
          setResponse(data);
        });
      }, []);
    
    return (
                <div>
                <img src={DisplayImage} height='200px' width='200px'></img>
                
                <div class="search__container">
                <p class="search__title" >
                    Watch videos in sync with friends It's <time dateTime={response}>{response}</time>
                </p>
                <form onSubmit={onSubmit}>
                <input class="search__input" type="text" onChange={e=> setURL({url: e.target.value})} placeholder="Enter YouTube Link" />
                <button type='submit'>Watch Now</button>
                </form>
                </div>
                
            </div>
        );
}


export default Landing;