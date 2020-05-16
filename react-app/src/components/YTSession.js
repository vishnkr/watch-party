import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Video from './Video';

const YTSession = (props) =>{
    return(
        <div className='container'>
            <Video vid_id={props.vid_id} />
        </div>
    );
}

export default YTSession;