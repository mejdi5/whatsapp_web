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



function PublicChat({socket, currentChat, text, setText, setManage, scrollRef}) {

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    const [optSmModal, setOptSmModal] = useState(false);
    const [membersView, setMembersView] = useState(false);
    const [msg, setMsg] = useState('');


    //get messages of current chat
    useEffect(() => 
    dispatch(getMessages(currentChat?._id))
    , [messages])

    //get realtime public messages 
    useEffect(() => 
        currentChat?.members &&
        socket.current.on("getPublicMessage", ({_id, conversation, senderId, members, text }) => 
        !messages.some(m => m._id === _id ) &&
        dispatch(postMessage({
            conversation,
            sender: senderId,
            text,
            date: Date.now()
            },currentChat._id))
        )
    , [messages]);


    //post new public message
    const AddPublicMessage = (e) => {
        e.preventDefault();
        socket.current.emit("sendPublicMessage", {
        _id: Math.random(),
        conversation: currentChat._id,
        senderId: user._id,
        members: currentChat.members,
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


    //delete public message
const removePublicMessage = (id) => {
    dispatch(deleteMessage(id,currentChat._id))
    setOptSmModal(false)
    setMsg('')
}

return (
<div className="chat">
            <div className="chat_header">
                <div className="chat_headerinfo">
                    <Button onClick={() => setMembersView(true)}>Members</Button>
                    <MDBModal show={membersView} tabIndex='-1' setShow={setMembersView}>
                    <MDBModalDialog size='sm'>
                    <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle                     
                    style={{marginLeft:'35%', marginTop:'10px'}}
                    >Members</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setMembersView(false)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                    {currentChat.members && currentChat.members.map((m, index) => 
                    <div key={index}
                    style={{textAlign:'center'}}
                    >{users && users.find(u => u._id === m).firstName} {users && users.find(u => u._id === m).lastName}</div>
                    )}
                    </MDBModalBody>
                    </MDBModalContent>
                    </MDBModalDialog>
                    </MDBModal>
                </div>
                <div className="chat_headerRight">
                {user.isAdmin && <Button onClick={() => setManage(true)}>Manage</Button>}
            </div>
            </div>
        
        
            <div className="public_chat_bodies">
            {messages && messages.map((message,index) => {
                const Sender =  users.find(el => el._id === message.sender)
                const open = () => {
                    if(message.sender === user._id) {
                        setMsg(message) 
                        setOptSmModal(true)
                    } else {
                        setOptSmModal(false)
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
                    <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
                    <MDBModalDialog size='sm'>
                    <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>{`Delete ${msg.text} ?`}</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={() => setOptSmModal(!optSmModal)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                    <MDBBtn 
                    onClick={() => removePublicMessage(msg._id)}
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
                    onClick={AddPublicMessage}
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

export default PublicChat;
