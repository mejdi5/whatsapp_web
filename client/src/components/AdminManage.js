import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../Redux/actions/userActions'
import { getUsers } from '../Redux/actions/userActions';
import { getAuthUser } from '../Redux/actions/authActions';
import {getConversations, deleteConversation} from '../Redux/actions/conversationActions'
import {getMessages} from '../Redux/actions/messageActions'
import { format } from 'timeago.js';
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBCard, 
    MDBCardBody, 
    MDBCardTitle, 
    MDBRow, 
    MDBCol, 
} from 'mdb-react-ui-kit';


function AdminManage() {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    const conversations = useSelector((state) => state.conversations);
    const [modal, setModal] = useState(false)
    const [openingModal, setOpeningModal] = useState(false)
    const [toggle, setToggle] = useState("users")


    //delete user
    const removeUser = (id) => {
        dispatch(deleteUser(id))
        setModal(false) 
    }
    
    //get all conversations 
    useEffect(() =>
        users?.map(u => 
        dispatch(getConversations(u._id))
        ), []);
    
    const setUserConversations = (userId) => {
        dispatch(getConversations(userId));
        setToggle("conversations")
    }

    //delete conversation
    const removeConversation = (id) => {
        dispatch(deleteConversation(id))
        setOpeningModal(false)
    }

    //get all messages 
    useEffect(() =>
        conversations?.map(c => 
        dispatch(getMessages(c?._id))
        ), []);

    const setConversationMessages= (conversationId) => {
        dispatch(getMessages(conversationId));
        setToggle("messages")
    }



if (toggle === "users") {
    return (
    <>
    <div className="grid-container">
    <div className="grid-item">
    {users && users.filter(u => !u.isAdmin).map(u =>
    <div style={{marginBottom:'20px'}}>
    <MDBRow>
    <MDBCol sm='12'>
        <MDBCard>
            <MDBCardBody>
                <MDBCardTitle> {u.firstName} {u.lastName} </MDBCardTitle>
                <MDBCardTitle> {u.email} </MDBCardTitle>
                <MDBBtn onClick={() => setUserConversations(u._id)}>Conversations</MDBBtn>
                <MDBBtn onClick={() => setModal(true)}>Delete</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
    </MDBRow> 


    <MDBModal show={modal} tabIndex='-1' setShow={setModal}>
    <MDBModalDialog size='sm'>
    <MDBModalContent>
        <MDBModalHeader>
        <MDBModalTitle>Delete {u.firstName} ?</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => setModal(!modal)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <MDBBtn onClick={() => removeUser(u._id)}>Delete</MDBBtn>
        </MDBModalBody>
    </MDBModalContent>
    </MDBModalDialog>
    </MDBModal>
    </div>
        )}
    </div>
</div>
</>
    )
}
    
if (toggle === "conversations") {
    return (
        <>
        <div className="grid-container">
            <div className="grid-item">
            {conversations && conversations
            .filter(conversation =>  conversation.senderId !== user._id && conversation.receiverId !== user._id)
            .map((conversation,index) => {
                const firstUser = users.find(u => u._id === conversation.senderId)
                const secondUser = users.find(u => u._id === conversation.receiverId)
            return (
                <div style={{marginBottom:'20px'}}>
                <MDBRow>
                <MDBCol sm='12'>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle> Conversation {index + 1} </MDBCardTitle>
                        {firstUser !== secondUser 
                        ? <MDBCardTitle> {firstUser.firstName} {firstUser.lastName} / {secondUser.firstName} {secondUser.lastName} </MDBCardTitle>
                        : <MDBCardTitle> {firstUser.firstName} {firstUser.lastName} </MDBCardTitle>
                        }
                            <MDBBtn onClick={() => setConversationMessages(conversation._id)}>See Messages</MDBBtn>
                            <MDBBtn onClick={() => setOpeningModal(true)}>Delete</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow> 
        
            <MDBModal show={openingModal} tabIndex='-1' setShow={setOpeningModal}>
            <MDBModalDialog size='sm'>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Delete this conversation ?</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpeningModal(!openingModal)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <MDBBtn onClick={() => removeConversation(conversation._id)}>Delete</MDBBtn>
                </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
                </div>
            )}
            )
            }
            </div>
        </div>
        <p className="manage"
        onClick={() => setToggle("users")}
        >manage users</p>
        </>   
    )
}
if (toggle === "messages") {
    return (
    <>
    <div className="chat_bodies">
    {messages && messages.map((message, index) => {
    const Sender =  users.find(el => el._id === message.sender)
    return (
    <div key={message._id}>
    <p className={index%2 === 0 ? "chat_message" : "chat_receiver" } style={{backgroundColor:'white', cursor:'auto'}}>
    <span className="chat_name">{Sender.firstName}</span>
    {message.text}
    <span className="chat_timestamp">{format(message.date)}</span>
    </p>
    </div>
    )} 
    )}
    </div>
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <p className="manage"
    onClick={() => setToggle("users")}
    >manage users</p>
    <p className="manage"
    onClick={() => setToggle("conversations")}
    >manage conversations</p>
    </div>
    </>   
    )
}
}

export default AdminManage;
