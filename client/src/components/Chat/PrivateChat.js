import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { format } from 'timeago.js';
import {getMessages, postMessage, deleteMessage} from '../../Redux/actions/messageActions'
import {Button} from 'reactstrap'
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';




function PrivateChat({socket, currentChat, text, setText, setManage, scrollRef}) {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    const [optModal, setOptModal] = useState(false);
    const [msg, setMsg] = useState('');


    //get messages of current chat
    useEffect(() =>
    currentChat?.senderId && currentChat?.receiverId &&
    dispatch(getMessages(currentChat?._id))
    , [messages])


//get realtime private messages 
useEffect(() => 
currentChat?.senderId && currentChat?.receiverId &&
socket.current.on("getMessage", ({_id, conversation, senderId, receiverId, text }) => 
!messages.some(m => m._id === _id ) &&
dispatch(postMessage({
    conversation,
    sender: senderId,
    text,
    date: Date.now()
    },currentChat._id))
)
, [messages]);


//post new message
const AddMessage = (e) => {
    e.preventDefault();
    socket.current.emit("sendMessage", {
    _id: Math.random(),
    conversation: currentChat._id,
    senderId: user._id,
    receiverId: Object.values(currentChat).find(id => id !== user._id && id !== currentChat._id) || user._id,
    text
    });
    dispatch(postMessage({
        conversation: currentChat._id,
        sender: user._id,
        text,
        date: Date.now()
        },currentChat._id));
    setText(''); 
}


//delete message
const removePrivateMessage = (id) => {
    dispatch(deleteMessage(id,currentChat._id))
    setOptModal(false) 
    setMsg('')
}

return (
    <div className="chat">
            <div className="chat_header">
                <div className="chat_headerinfo">
                </div>
                <div className="chat_headerRight">
                {user.isAdmin && <Button onClick={() => setManage(true)}>Manage</Button>}
            </div>
            </div>
        
        
            <div className="chat_bodies">
            {messages && messages.map((message,index) => {
                const Sender = users.find(el => el._id === message.sender)
                const open = () => {
                    if(message.sender === user._id) {
                        setMsg(message) 
                        setOptModal(true)
                    } else {
                        setOptModal(false)
                    }}
                if (message.conversation === currentChat._id) {
                return (
                    <div key={index}>
                    <p 
                    className={Sender._id === user._id ? "chat_message" : "chat_receiver" } 
                    onClick={open}
                    ref={scrollRef}
                    >
                    <span className="chat_name">{Sender.firstName}</span>
                    {message.text} 
                    <span className="chat_timestamp">{format(message.date)}</span>
                    </p>
                    <MDBModal show={optModal} tabIndex='-1' setShow={setOptModal}>
                    <MDBModalDialog size='sm'>
                    <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>{`Delete ${msg.text} ?`}</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setOptModal(false)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                    <MDBBtn 
                    onClick={() => removePrivateMessage(msg._id)}
                    style={{marginLeft:'30%', marginTop:'10px'}}
                    >Delete</MDBBtn>
                    </MDBModalBody>
                    </MDBModalContent>
                    </MDBModalDialog>
                    </MDBModal>
                    </div>
                    )} 
                }
                )} 
            </div>
        
            <div className="chat-footer">
                <InsertEmoticonIcon/>
                <form>
                <input
                    placeholder="Type a message"
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button 
                    type="submit" 
                    onClick={AddMessage}
                    className="btn btn-primary"
                >
                    Send
                </button>
                </form>
                <MicIcon/>
            </div>
            
            </div>
)
}

export default PrivateChat;
