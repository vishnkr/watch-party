import React, { Component,useState } from 'react'
import './chat.css'
import {Input, Icon} from 'semantic-ui-react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Avatar from 'react-avatar';
import useAtTop from 'react-scroll-to-bottom/lib/hooks/useAtTop';

//(props.senderId)===props.curUser.Id
/*
props for a chat message:
text
senderid
curUser
*/
const ChatMessage = (props) =>{
        return (1==1? 
        <div className="message-container">
            <div className='messageContainer justifyEnd'>
                <section>
                    {/*<img src={getAvatarUrl({
                                    name: getNameById(user.id),
                                    background: user.colors.bg,
                                    color: user.colors.txt,
                                })} alt='avatar'/>*/}
                    
                </section>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorLight'>{props.message}</p>
                </div>
                <section>
                    <Avatar className="avatar" name={props.username} size="30" round={true}/>
                </section>
                {/* <p className='sentText colorGray pl-10'>{user.name}</p> */}
            </div>
        </div>
        :
        <div className="message-container">
            <div className='messageContainer justifyStart'>
                <section>
                    <Avatar name={props.name} />
                </section>
                <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{props.message}</p>
                </div>
                {/* <p className='sentText colorGray pl-10'>{user.name}</p> */}
            </div>
        </div>
        
    );
    
}

const ChatContent = (props) =>{
    const messages= [props.username]
    return(
      <ScrollToBottom className="messages">
            {
                messages.map((message, i) =>
                    <div className="messageOuterContainer" key={i}>
                        <ChatMessage username={props.username} message={message} />
                    </div>
                )
            }
            
      </ScrollToBottom>
    );
  }

function Chat(props){
    const [messages,setMessages] = useState([]);
    const [myMessage,setMyMessage] = useState('');
    const [curSocket,setCurSocket] = useState(props.socket);
    const [username,setUserName] = useState(props.username);
    const handleChange =(e)=>{
        var sendIcon = document.getElementById("send-icon");
        setMyMessage(e.target.value);
        if(e.target.value.length >0){
            sendIcon.classList.add('colorChange');
        }
        else{
            sendIcon.classList.remove('colorChange');
        }
    }

    const sendMessage=(e)=>{
        e.preventDefault();
        let trimMessage = myMessage.trim();
        if (trimMessage.length > 0) { //check whitespace
            curSocket.emit('send-message',{'user':username,'message':trimMessage},()=>setMyMessage(''));
        }
    }
    const welcomeMessage = "Hey " + username +", Welcome to your Watch Party Room"+"!! Invite your friends by sharing the above link!"
    return (
        <div className="chatContainer">
            <section className="welcome-message">
                {welcomeMessage}
            </section>
            <ChatContent username={username} />
            <div className="input">
                <Input onChange={handleChange} size="large" icon className="chat-input" fluid placeholder='Type message...'>
                <input />
                <Icon id="send-icon" name='send' onClick={e=> sendMessage(e)}/>
                </Input>
            </div>
        </div>
    );
}

export default Chat;

