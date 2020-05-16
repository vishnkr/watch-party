import React,{useState} from 'react';
import {BrowserRouter as Router,Route,withRouter,Switch} from 'react-router-dom'; 
import Landing from './components/Landing';
import Video from './components/Video';
import YTSession from './components/YTSession';

function App() {

  const [sessionID, setSessionID] = useState('');
  const [host,setHost] = useState('');
  const [vidID,setVidID] = useState('');

  const createSession = (vidID, session, leaderbool) => {
    setVidID(vidID);
    setSessionID(session);
    setHost(leaderbool);
  };
  return (
    <Router>
    <div className="App">
      <div className='container'>
        <Route exact path='/' render={() => <Landing session={createSession} />} />
        <Route exact path='/video/host' render={() => <YTSession vid_id='j1ZRyw7OtZs' />} />
        <Route exact path ='/youtube' component={withRouter(Video)} />
      </div>
      
    </div>
    </Router>
  );
}

export default App;
