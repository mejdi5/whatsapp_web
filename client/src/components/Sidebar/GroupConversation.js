import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getGroupConversations, postGroupConversation} from '../../Redux/actions/groupConversationActions'
import {Button} from 'reactstrap'
import noAvatar from '../../images/noAvatar.png'
import { MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';


function GroupConversation({currentChat, setCurrentChat}) {

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    
    const groupConversations = useSelector((state) => state.groupConversations);
    const [openGroupModal, setOpenGroupModal] = useState(false);
    //const [groupStyle, setGroupStyle] = useState("none");
    const [members, setMembers] = useState([user?._id]);
    const [email, setEmail] = useState('')

    const addToGroup = () => {
        const newUser = users && users.find(el => el.email === email)
        newUser && !members.some(m => m === newUser._id) && setMembers([...members, newUser._id]);
        setEmail('')
    }

const resetGroup = () => {
    setEmail('');
    setMembers([user?._id]);
    setOpenGroupModal(false)
}

const AddGroupConversation = () => {
    members.length > 2 
    ? dispatch(postGroupConversation({members}, user._id))
    : alert('group chat must have at least three members')
    resetGroup()
}

return (
    <div className="sidebar-chats" >
        <h6 style={{marginLeft:'35%', cursor:'pointer', fontWeight:'bold'}}>Groups</h6>
        <Button onClick={() => setOpenGroupModal(true)} color="primary">New</Button>
        
        {groupConversations && groupConversations
        .map(groupConversation => {
        if(groupConversation.members.some(m => m == user._id)) {
            return (
        <div key={groupConversation._id}>
        <div 
        className={currentChat === groupConversation ? "sidebarchatactive" : "sidebarchat"}
        //onMouseOver={() => setGroupStyle("block")}
        //onMouseOut={() => setGroupStyle("none")}
        >
            {users.filter(u => groupConversation.members.some(m => m === u._id) && u !== user)
            && 
            <>
            <div onClick={() => setCurrentChat(groupConversation)} style={{display:'flex'}}>
            <img
            crossOrigin='anonymous'
            className="conversationImg"
            src={
                users.filter(u => u._id !== user._id).find(u => groupConversation.members.some(m => m === u._id) && u!== user)?.picture 
            ? users.filter(u => u._id !== user._id).find(u => groupConversation.members.some(m => m === u._id) && u!== user).picture.path
            : noAvatar
            }
            alt=""
            />
            <div className="sidebarChat_info">
                <h2> {`${users.filter(u => u._id !== user._id).filter(u => groupConversation.members.some(m => m === u._id))[0]?.firstName}, ${users.filter(u => u._id !== user._id).filter(u => groupConversation.members.some(m => m === u._id))[1]?.firstName}, ... `} </h2>
            </div>
            </div>
            </>
            }      
        </div>
        </div>
        )} 
})}
        <MDBModal show={openGroupModal} tabIndex='-1' setShow={setOpenGroupModal}>
        <MDBModalDialog size='sm'>
        <MDBModalContent>
            <MDBModalHeader>
            <MDBModalTitle>Create New Group Chat</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={resetGroup}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <div className="form-group" style={{display: 'flex', marginBottom:'20px'}}>
                <label style={{fontWeight:'bold', margin:'10px',marginRight:'10px' }}>Member</label>
                <input 
                style={{height:'40px'}}
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"  
                placeholder="Enter email..."
                />
                <h1 style={{fontWeight:'bold', cursor:'pointer', margin:'5px'}}
                onClick={addToGroup}>+</h1>
            </div>
            {members && members.map((m, index) => 
            <div key={index}
            style={{textAlign:'center'}}
            >{users && users.find(u => u._id === m)?.firstName} {users && users.find(u => u._id === m)?.lastName}</div>
            )}
            <MDBBtn 
            onClick={AddGroupConversation} 
            style={{marginLeft:'35%', marginTop:'20px', marginBottom:'20px'}}
            >Submit</MDBBtn>
            </MDBModalBody>
        </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>
    </div>
)}

export default GroupConversation;
