import React,{useState} from 'react';
import YouTube from 'react-youtube';

function Video(props){
    const [videoID, setvideoID] = useState(props.vid_id ? props.vid_id : null);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };
    
    function _onReady(event) {
        event.target.pauseVideo();
      }
    return (
        <div> 
            <YouTube videoId={videoID} opts={opts} onReady={_onReady} />
        </div>
    );
}

export default Video;
