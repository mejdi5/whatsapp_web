import React,{useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Button} from 'reactstrap'
import AdminManage from '../AdminManage'
import PrivateChat from './PrivateChat';
import PublicChat from './PublicChat';


function Chat({currentChat, socket}) {

    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    const [manage, setManage] = useState(false);


    //scroll to last message
    const scrollRef = useRef()
    useEffect(() => 
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    , [messages]);


if (!manage) {
    return (
    <>
        {currentChat?.senderId && currentChat?.receiverId 
        ? 

        <PrivateChat 
        socket={socket}
        currentChat={currentChat}
        text={text}
        setText={setText}
        setManage={setManage}
        scrollRef={scrollRef}
        />
        
        : currentChat?.members 
        ? 

        
        <PublicChat 
        socket={socket}
        currentChat={currentChat}
        text={text}
        setText={setText}
        setManage={setManage}
        scrollRef={scrollRef}
        />

        :

        <div className="chat" >
        <div className="chat_header">
            <div className="chat_headerinfo"></div>
            <div className="chat_headerRight">
                {user?.isAdmin && <Button onClick={() => setManage(true)}>Manage</Button>}
            </div>
        </div>
        <h2
        className="conversation_text display-1 opacity-50"
        >Start A New Conversation</h2>
        </div>
        }
    </>
    )
} 

if(manage) {
    return (
    <div className='chat'>
        <AdminManage/>
        <div className="chat_header">
                <div className="chat_headerinfo"></div>
                <div className="chat_headerRight">
                {user.isAdmin && <Button onClick={() => setManage(false)}>Back to Chat</Button>}
                </div>
        </div>
    </div>
    )
}
}

export default Chat
