import React,{useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../Redux/actions/authActions';
import {getConversations, postConversation} from '../Redux/actions/conversationActions'
import {getGroupConversations} from '../Redux/actions/groupConversationActions'
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import { io } from "socket.io-client";


function Home() {
    

    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const conversations = useSelector((state) => state.conversations);
    const groupConversations = useSelector((state) => state.groupConversations);
    const socket = useRef();


    //get current user
    useEffect(() => {
        dispatch(getAuthUser());
    }, []); 

    //socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, [user]);

    //get online users
    useEffect(() => {
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", (Users) => {
        setOnlineUsers(
        users.filter((el) => Users.some((u) => u.userId === el._id))
        );
        });
    }, []);


//post conversations of current user
useEffect(() => 
    !user?.isAdmin && users
    .filter(u => !u.isAdmin)
    .map(el => {
    const newConversation = {senderId: user?._id || el._id, receiverId: el._id || user?._id}
    !conversations.some(c => c.senderId === newConversation.senderId && c.receiverId === newConversation.receiverId) &&
    dispatch(postConversation(newConversation,user?._id))
}), [conversations]);
/*
useEffect(() => 
    user.isAdmin && users.map(el => {
    dispatch(postConversation({senderId: user._id, receiverId: el._id },user._id))
}), [user]);
*/

    //get conversations of current user
    useEffect(() => 
    dispatch(getConversations(user?._id))
    , [conversations]);


    //get group conversations of current user
    useEffect(() => {
        dispatch(getGroupConversations(user?._id));
    }, [groupConversations]);


return (
<div className="app">
	<div className="app__body">

        <Sidebar 
        currentChat={currentChat} 
        setCurrentChat={setCurrentChat}
        onlineUsers={onlineUsers}
        />

        <Chat 
        currentChat={currentChat} 
        socket={socket}
        />

	</div>
</div>
    )
}

export default Home