import React,{useState} from 'react'
import './sidemenu.css'
import {Icon,Menu} from 'semantic-ui-react'
import Chat from './Chat/Chat'
import Viewers from './Viewers'
import Settings from './Settings/Settings'


function SideMenu(props){
    const [activeItem,setActiveItem] = useState('chat')

    function handleItemClick (e,{name}){
        setActiveItem(name);
        console.log(activeItem);
    }

    const menuItems = {'chat':<Chat />, 'viewers':<Viewers />, 'settings':<Settings /> }

    return(
        <div className="test">
        <Menu size="mini" className='menu-panel' widths={3} compact icon='labeled'>
        <Menu.Item
          name='chat'
          active={activeItem === 'chat'}
          onClick={handleItemClick}
        >
          <Icon name='chat' />
          Chat
        </Menu.Item>
        <Menu.Item
          name='viewers'
          active={activeItem === 'viewers'}
          onClick={handleItemClick}
        >
          <Icon name='group' />
          Viewers
        </Menu.Item>
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}
          onClick={handleItemClick}
        >
          <Icon name='settings' />
          Settings
        </Menu.Item>
      </Menu>
      {menuItems[activeItem]}
      </div>
    );
}

export default SideMenu;