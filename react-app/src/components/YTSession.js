import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Video from './Video';
import './video.css';
import socketIOClient from 'socket.io-client';

const Share = (props) =>{
  const history = useHistory();
  var share_url = "localhost:3000"+history.location.pathname.replace('host/','');
  return(
    <div className="container">
      <input size="50" className="sharelink" value={share_url}/>
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
        <div className='container'>
            <Video vid_id={checkVidID} isHost={props.isHost} socket={socket} />
            {props.isHost && <Share link={props.sessionID} />}
            
        </div>
    );
}

export default YTSession;