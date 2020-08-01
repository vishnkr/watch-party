import React,{useEffect,useState,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Video from './Video/Video';
import './Video/video.css';
import socketIOClient from 'socket.io-client';
import './Video/watch.css';
import Chat from './SideMenu/Chat/Chat';
import SideMenu from './SideMenu/SideMenu';
import { Input } from 'semantic-ui-react'
import {generator} from '../name-generator/generator';


const Share = (props) =>{
  const history = useHistory();
  console.log(history);
  var share_url = "localhost:3000"+history.location.pathname.replace('host/','');
  const [text, setText] = useState('link');
  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setText('Copied to clipboard');
    const timer = setTimeout(() => setText(share_url), 1000);
    return () => clearTimeout(timer);
  }
  return(
    
    <div className='share'>
      <div className="text">
        <h3>Share this link</h3>
      </div>
      <div className="input-copy">
      <Input
        action={{
          color: 'teal',
          labelPosition: 'right',
          icon: 'copy',
          content: 'Copy',
          size:'small',
        }}
        defaultValue={share_url}
      />
      </div>
    </div>
  );
}
const YTSession = (props) =>{
    const [userName,setUserName] = useState(generator);
    const [socket,setSocket] = useState(socketIOClient("http://localhost:8000"));
    console.log('ytsession props:',props);
    
    let check = useParams();
    console.log("check:",check);
    let checksessionID = check.sessionID;
    let checkVidID=check.vidID;
    if(!checksessionID){
        checksessionID=props.sessionID;
    }
    if(!checkVidID){
        checkVidID=props.vidID;
    }
    
    return(
        
        <div className="watch-container">
              <div className="sharelink">
                <Share link={props.sessionID} />
              </div>
              <div className="mid-row">
                  <div className="vid-container">
                  <Video vid_id={checkVidID} sessionID={checksessionID} username={userName} isHost={props.isHost} socket={socket} />
                  </div>
                  <div className="sidemenu">
                    <SideMenu username={userName} socket={socket}/>
                  </div>
                </div>
                
              
            </div>
    );
}

export default YTSession;
/*
<div className='container'>
            <Video vid_id={checkVidID} isHost={props.isHost} socket={socket} />
            {props.isHost && <Share link={props.sessionID} />}
            <Chat />
        </div>*/