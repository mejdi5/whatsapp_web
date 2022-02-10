import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'reactstrap'
import {logout} from '../../Redux/actions/authActions'
import {Link} from 'react-router-dom'
import { editUser } from '../../Redux/actions/userActions'
import noAvatar from '../../images/noAvatar.png'
import axios from 'axios'
import { MDBFile,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';



function SideBarHeader() {


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    
    const [image, setImage] = useState(null)
    const [optSmModal, setOptSmModal] = useState(false);
    


    //change picture
    const onFileChange = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
    }

    //submit new picture
    const OnSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        axios.post("http://localhost:5000/api/pictures/upload", formData, {})
        .then(res => dispatch(editUser(user._id, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            picture: res.data.picture,
            isAdmin: user.isAdmin
        })))
        .catch(error => console.log(error));
        setOptSmModal(false);
    }

    //delete picture
    const removePicture = (e) => {
        e.preventDefault()
        axios
        .delete(`http://localhost:5000/api/pictures/delete/${user.picture}`)
        .then(res => dispatch(editUser(user._id, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            picture: "",
            isAdmin: false
        })))
        .catch(error => console.log(error));
        setOptSmModal(false);
    }

return (
    <div className="sidebar-header">
    <>
    <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
        <MDBModalDialog size='sm'>
        <MDBModalContent>
            <MDBModalHeader>
            <MDBModalTitle>{user?.picture !== "" ? "What do you want to do ?" : "Edit Photo"}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => setOptSmModal(!optSmModal)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            {user?.picture !== "" && <h6 style={{marginLeft:'30%'}}>Edit Photo</h6>}
            <div className='file-container' onChange={onFileChange}>
                <MDBFile size='sm' id='formFileSm' />
                <MDBBtn onClick={OnSubmit} style={{marginLeft:'30%', marginTop:'10px', marginBottom:'30px'}}>Update</MDBBtn>
            </div>
            {user && user?.picture !== "" &&
            <>
            <h6 style={{marginLeft:'30%'}}>Delete Photo</h6>
            <MDBBtn onClick={removePicture} style={{marginLeft:'30%', marginBottom:'20px'}}>Delete</MDBBtn>
            </> 
            }
            </MDBModalBody>
        </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
    </>
    <div className="sidebar-headerRight">
        <img
        onClick={() => setOptSmModal(!optSmModal)}
        className="conversationImg"
        src={
        user?.picture && user.picture !== null
        ? user.picture.path
        : noAvatar
        }
        crossOrigin='anonymous'
        alt=""
        />
        <Link to="/">
            <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Link>
    </div>
    </div>
)
}

export default SideBarHeader;
