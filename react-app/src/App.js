import React,{useState} from 'react';
import {BrowserRouter as Router,Route,withRouter} from 'react-router-dom'; 
import Landing from './components/Landing';


function App() {
  return (
    <Router>
    <div className="App">
      <div className='container'>
        <Route exact path='/' component= {withRouter(Landing)}>
          <Landing />
        </Route>
        
      </div>
      
    </div>
    </Router>
  );
}

export default App;
