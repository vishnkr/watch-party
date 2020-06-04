import React,{useState,useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import "./video.css";

function Video(props){
    const [videoID, setvideoID] = useState(props.vid_id ? props.vid_id : null);
    
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
      };

    function onYouTubeIframeAPIReady() {
      var player;
      player = new window.YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoID,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == window.YT.PlayerState.PLAYING && !done) {
          done = true;
        }
      }
    function onPlayerReady(event) {
        event.target.playVideo();
      }
    useEffect(()=>{
      props.socket.on('message',(event)=>{
        console.log(event);
      });
      if(!props.isHost){
        joinRoom(videoID);
      }
      if (typeof(window.YT) == 'undefined' || typeof(window.YT.Player) == 'undefined') {
        console.log('reaches');
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else onYouTubeIframeAPIReady();

      });

    
    const joinRoom = (vidID)=>{
      setvideoID(vidID)
    }
    return (
        <div className="videoWrap"> 
              <div id='player'></div>
        </div>
    );
}

export default Video;
