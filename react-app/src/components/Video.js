import React,{useState,useEffect} from 'react';
import "./video.css";


var player;
function Video(props){
    const [videoID, setvideoID] = useState(props.vid_id ? props.vid_id : null);
    const [socket,setSocket] = useState(props.socket);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
      };

    const onYouTubeIframeAPIReady = () =>{
      
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
        console.log("cur-time:",  player.getCurrentTime());
        socket.emit('time-sync',player.getCurrentTime())
      }
    function onPlayerReady(event) {
        event.target.playVideo();
      }
    useEffect(()=>{
      if(!props.isHost){
        joinRoom(videoID);
      }
      
      socket.on('connection',()=>{
        console.log('new-connection');
      });
      
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
