import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Video from './Video';


const YTSession = (props) =>{
    const history = useHistory();
    console.log('props:',props);
    const web_url= 'ws://localhost:5000/';
    const socket = new WebSocket(web_url);

    
    let check = useParams();
    let checksessionID = check.sessionID;
    let checkVidID=check.vidID;
    if(!checksessionID){
        checksessionID=props.sessionID;
    }
    if(!checkVidID){
        checkVidID=props.vidID;
    }
    useEffect(() => {
        socket.onopen = () => {
          socket.send(
            JSON.stringify({
              event: 'session',
              userAction: props.userAction,
              sessionID: props.sessionID,
              vidID: props.vidID,
            })
          );
        };
      });
    
    return(
        <div className='container'>
            <Video vid_id={checkVidID} socket={socket} isHost={props.isHost} />
        </div>
    );
}

export default YTSession;