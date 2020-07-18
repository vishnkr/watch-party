import React,{useEffect,useState,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Video from './Video/Video';
import './Video/video.css';
import socketIOClient from 'socket.io-client';
import './Video/watch.css';
import Chat from '../SideMenu/Chat/Chat';
import SideMenu from '../SideMenu/SideMenu';

/*
<div className="container">
      <input size="50" className="sharelink" value={share_url}/>
    </div>*/
const Share = (props) =>{
  const history = useHistory();
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
    
    <div className='input-container'>
      <h3 className='text'>Share this link</h3>
      <form className='input-form'>
        <input
          className='input-field'
          readonly
          value={share_url}
        />
        <button className='input-button' onClick={copyToClipboard}>
          Copy
        </button>
      </form>
    </div>
  );
}
const YTSession = (props) =>{
    
    const socket = socketIOClient("http://localhost:8000");
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
    
    console.log("checkvid, checksess",checkVidID,checksessionID);
    return(
        
        <div className="watch-container">
              <div className="sharelink">
                <Share link={props.sessionID} />
              </div>
              <div className="mid-row">
                  <div className="vid-container">
                  <Video vid_id={checkVidID} isHost={props.isHost} socket={socket} />
                  </div>
                  <div className="sidemenu">
                    <SideMenu />
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