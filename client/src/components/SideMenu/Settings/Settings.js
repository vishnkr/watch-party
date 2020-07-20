import React from 'react'
import { Icon,Button } from 'semantic-ui-react'
import './settings.css'
import ScrollToBottom from 'react-scroll-to-bottom';
function Settings(){
    return(
        <div className="settings-container">
            <h3>Settings</h3>
            <Button negative>Leave Room   <Icon name="sign-out"/></Button>
        </div>
    )
}

export default Settings;