import React from 'react'
import {Item} from 'semantic-ui-react'
import Avatar from 'react-avatar'
import ScrollToBottom from 'react-scroll-to-bottom';
import './sidemenu.css'
function Viewers(props){
    return (

        <div className="viewers-container">
            <h3>Viewers</h3>
                <Item.Group>
                    
                    <Item>
                    <Item.Image size='tiny' >
                        <Avatar name={props.username} size="40" />
                    </Item.Image>

                    <Item.Content verticalAlign='middle'>
                        <Item.Header>
                        {props.username} (you)
                        </Item.Header>
                    </Item.Content>
                    </Item>
                    
                </Item.Group>
        </div>
    );
}

export default Viewers;