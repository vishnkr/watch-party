import React,{useState,useEffect} from 'react';

import {useHistory} from 'react-router-dom';
import './landing.css';

import { Search, Button, Transition } from 'semantic-ui-react'
import { uuid } from 'uuidv4';
import Image from '../../assets/image.svg';


const MainLogo = () => (
    <div>
    <img src={Image} width="45" />
    <div className="logo-container">
             
        <h1>
            
            <span className="primaryColor">WATCH </span>
            <span className="secondaryColor"> PARTY</span>
        </h1>
    </div>
    </div>
);

function Landing(props){
    const [url,setURL] = useState('');
    const [response,setResponse] = useState('');
    const history = useHistory();
    const [mounted, setMounted] = useState(false);

    const youtubeParser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = (url).match(regExp);
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
        history.push('/watch/host/'+sessionID+'/'+url_id);
        console.log('history:',history);
        return;
    }
    useEffect(() => setMounted(true), []);
    
    return (
        <div className="options-container">
        <Transition visible={mounted} animation='scale' duration={500}>
        <div className="main-container">
            <section>
                <MainLogo />
                <div className="title-container">
                    <h2>Watch videos in sync with friends</h2>
                </div>
                <Search showNoResults={false} onSearchChange={e=>{setURL( e.target.value)}} size="huge" fluid={true} className="search-bar" />
               
                <Button content='Create Room' className='button-join' onClick={onSubmit} />
            </section>    
        </div>
        </Transition>
        
        
    </div>
        );
}


export default Landing;

/*
                    <form className="landing-form" onSubmit={onSubmit}>
                            <input type='text' onChange={e=> setURL({url: e.target.value})} placeholder="Enter YouTube Link" />
*/