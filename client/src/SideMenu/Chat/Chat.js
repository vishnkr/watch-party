import React, { Component } from 'react'
import './chat.css'
import {Input, Icon} from 'semantic-ui-react';
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatMessage = (props) =>{
    return(
        <div className="message-container">
            
        </div>
    );
}

const ChatContent = (props) =>{
   
    return(
      <ScrollToBottom>
        <div className='content-container'>
        <div className='messageContainer justifyStart'>
                            <section>
                                {/*<img src={getAvatarUrl({
                                    name: getNameById(user.id),
                                    background: user.colors.bg,
                                    color: user.colors.txt,
                                })} alt='avatar'/>*/}
                            </section>
                            <div className='messageBox backgroundLight'>
                                <p className='messageText colorDark'>{"hello"}</p>
                            </div>
                            {/* <p className='sentText colorGray pl-10'>{user.name}</p> */}
                        </div>
        </div>
      </ScrollToBottom>
    );
  }

function Chat(props){
    const handleChange =(e)=>{
        var inputField = document.getElementsByClassName("chat-name");
        var sendIcon = document.getElementById("send-icon");
        if(e.target.value.length >0){
            sendIcon.classList.add('colorChange');
        }
        else{
            sendIcon.classList.remove('colorChange');
        }
    }
    return (
        <div>
            <ChatContent />
            <Input onChange={handleChange} size="large" icon className="chat-input" fluid placeholder='Type message...'>
            <input />
            <Icon id="send-icon" name='send' />
            </Input>
        </div>
    );
}

export default Chat;

