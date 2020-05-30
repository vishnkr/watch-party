import React,{useState,useEffect} from 'react';
import YouTube from 'react-youtube';
import "./Video.css";

function Video(props){
    const [videoID, setvideoID] = useState(props.vid_id ? props.vid_id : null);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
      };
    
    function _onReady(event) {
        event.target.pauseVideo();
      }

    useEffect(() => {
      props.socket.addEventListener('message',(event)=>{
        let socket_data = JSON.parse(event.data);
        console.log("data",event.data);
      })
    });
    
    return (
        <div className="videoWrap"> 
            <YouTube videoId={videoID} opts={opts} onReady={_onReady} />
        </div>
    );
}

export default Video;
