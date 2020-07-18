import React,{useState} from 'react';
import {BrowserRouter as Router,Route,withRouter,Switch} from 'react-router-dom'; 
import Landing from './components/Landing/Landing';
import Video from './components/Video/Video';
import YTSession from './components/YTSession';
import NavBar from './components/NavBar/NavBar';
import 'semantic-ui-css/semantic.min.css'

function App() {

  const [sessionID, setSessionID] = useState('');
  const [isHost,setIsHost] = useState(false);
  const [vidID,setVidID] = useState('');
  const [userActionType,setUserActionType] = useState('join-room');

  const newSession = (vidID, session) => {
    setVidID(vidID);
    setSessionID(session);
    setIsHost(true);
    setUserActionType('create-room');
  };

  const defaultSession = () =>{
    
  }
  return (
    
    <Router>
    <div className="App">
      <div className='container'>
        <NavBar />
        <Route exact path='/' render={() => <Landing session={newSession} />} />
        <Route exact path='/watch/host/:sessionID/:vidID' render={() => <YTSession vidID={vidID} sessionID={sessionID} isHost={isHost} userAction={'create-room'} />} />
        <Route exact path='/watch/:sessionID/:vidID' render={() => <YTSession vidID={vidID} sessionID={sessionID} isHost={isHost} userAction={userActionType} />} />
      </div>

      
    </div>
    </Router>
  );
}

export default App;
