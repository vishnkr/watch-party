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
        var data = {
          'current_time' : 0,
          'video_state': 'play'
         }
        if (event.data == window.YT.PlayerState.PLAYING && !done) {
          done = true;
        }
        if (event.data == window.YT.PlayerState.PAUSED) {
          data.video_state = 'pause';
        }
        data.current_time = player.getCurrentTime();
        socket.emit('time-sync',data);
      }
    function onPlayerReady(event) {
        event.target.playVideo();
      }
    useEffect(()=>{
      socket.on('current-time',(data)=>{
        console.log('received data from socket:',data);
        player.seekTo(data.current_time);
      });
      socket.on('connection',()=>{
        
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
    
    return (
        <div className="videoWrap"> 
            <div id='player'></div>
        </div>
    );
}

export default Video;
