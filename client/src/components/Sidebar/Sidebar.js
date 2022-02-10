import React from 'react'
import GroupConversation from './GroupConversation';
import PrivateConversation from './PrivateConversation';
import SideBarHeader from './SideBarHeader';



function Sidebar({currentChat, setCurrentChat, onlineUsers}) {

return (
<div className="sidebar">
    
    <SideBarHeader/>

    <PrivateConversation
    currentChat={currentChat}
    setCurrentChat={setCurrentChat}
    onlineUsers={onlineUsers}
    />

    <GroupConversation
    currentChat={currentChat}
    setCurrentChat={setCurrentChat}
    />

</div>
)}

export default Sidebar
