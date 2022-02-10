import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {deleteConversation} from '../../Redux/actions/conversationActions'
import noAvatar from '../../images/noAvatar.png'
import onlineIcon from '../../images/pngtree-whatsapp-color-icon-png-image_974074.jpg'
import { MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';



function PrivateConversation({currentChat, setCurrentChat, onlineUsers}) {

    
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations);
    const [onlineView, setOnlineView] = useState(true)
    //const [openModal, setOpenModal] = useState(false);
    //const [style, setStyle] = useState("none");

    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);



if(!onlineView) {
    return (
        <div className="sidebar-chats">
        <h6 onClick={() => setOnlineView(true)} style={{marginLeft:'40%', cursor:'pointer', fontWeight:'bold'}}>All</h6>
        {conversations  && conversations.map(conversation => 
            <div key={conversation._id}>
            {conversation.senderId !== conversation.receiverId 
            ?
            <div 
            className={currentChat === conversation ? "sidebarchatactive" : "sidebarchat"}
            >
                {(users.find(u => u._id !== user._id && !u.isAdmin && (u._id === conversation.receiverId || u._id === conversation.senderId)))
                && 
                <>
                <div onClick={() => setCurrentChat(conversation)} style={{display:'flex'}}>
                <img
                crossOrigin='anonymous'
                className="conversationImg"
                src={
                users.find(u => u._id !== user._id && !u.isAdmin && (u._id === conversation.receiverId || u._id === conversation.senderId))?.picture 
                ? users.find(u => u._id !== user._id && !u.isAdmin && (u._id === conversation.receiverId || u._id === conversation.senderId)).picture.path 
                : noAvatar
                }
                alt=""
                />
                <div className="sidebarChat_info">
                        <h2>{users.find(u => u._id !== user._id && !u.isAdmin && (u._id === conversation.receiverId || u._id === conversation.senderId)).firstName} {users.find(u => u._id !== user._id && !u.isAdmin && (u._id === conversation.receiverId || u._id === conversation.senderId)).lastName} </h2>
                </div>
                </div>
                </>
                }      
                
            </div>
            :
            <div 
            className={currentChat === conversation ? "sidebarchatactive" : "sidebarchat"}
            > 
                <>
                <div onClick={() => setCurrentChat(conversation)} style={{display:'flex'}}>
                <img
                crossOrigin='anonymous'
                className="conversationImg"
                src={
                user?.picture 
                ? user.picture.path 
                : noAvatar
                }
                alt=""
                />
                <div className="sidebarChat_info">
                        <h2>{user.firstName} {user.lastName} </h2>
                </div>
                </div>
                </>     
                
            </div>
            }
            </div>
        )}
        </div>
    )
}

if(onlineView) {
    return (
        <div className="sidebar-chats">
        <h6 onClick={() => setOnlineView(false)} style={{marginLeft:'40%', cursor:'pointer', color:'green', fontWeight:'bold'}} >Online</h6>
        {onlineUsers && onlineUsers.filter(onlineUser => !onlineUser.isAdmin).map(onlineUser => 
        onlineUser._id !== user?._id &&
            (
            <div key={onlineUser._id}             
            onClick={() => setCurrentChat(conversations.find(c => (c.senderId === user._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user._id)))}>
                <div className={currentChat === conversations.find(c => (c.senderId === user?._id && c.receiverId === onlineUser._id) || (c.senderId === onlineUser._id &&  c.receiverId === user?._id)) ? "sidebarchatactive" : "sidebarchat" }>
                    <img
                    crossOrigin='anonymous'
                    className="conversationImg"
                    src={
                    onlineUser.picture 
                    ? onlineUser.picture.path
                    : noAvatar
                    }
                    alt=""
                    />
                    <div className="sidebarChat_info">
                        <h2>{onlineUser.firstName} {onlineUser.lastName}</h2>
                    </div>
                    <img 
                    className="iconImg"
                    src={onlineIcon} 
                    alt=""
                    />
                </div>
            </div>
            )
    )}
        </div>
    )
}
}

export default PrivateConversation;
