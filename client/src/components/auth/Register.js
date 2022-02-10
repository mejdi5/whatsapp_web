import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/actions/authActions'
import {Link} from 'react-router-dom'

function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);


  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, phoneNumber, email };
    dispatch(registerUser(newUser));
    if (user) {
    navigate(`/${user._id}`)
    setEmail('')
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
    }
};


    return (
    <div className = "auth">
        <h1 style={{color:'white'}}>Sign Up</h1>
        <p style={{color:'white'}}>If you have already registered, go to <Link to="/login">login</Link> page</p>
    <div className = "auth_container">
    <div className = "auth_text"></div>
    <form>
            <div className="form-group" style={{display: 'flex'}}>
                <label style={{fontWeight:'bold', marginRight: '80px' }}>First Name</label>
                <input 
                type="firstName"
                value={firstName}
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="form-control"  
                aria-describedby="firstNameHelp" 
                placeholder="Enter First Name"
                required
                />
            </div>
            <div className="form-group" style={{display: 'flex', marginTop: '2rem'}}>
                <label style={{fontWeight:'bold', marginRight: '80px' }}>Last Name</label>
                <input 
                type="lastName"
                value={lastName}
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"  
                aria-describedby="lastNameHelp" 
                placeholder="Enter Last Name"
                />
            </div>
            <div className="form-group" style={{display: 'flex', marginTop: '2rem'}}>
                <label style={{fontWeight:'bold', marginRight: '60px' }}>Email address</label>
                <input 
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"  
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                />
            </div>
            <div className="form-group" style={{display: 'flex', marginTop: '2rem'}}>
                <label style={{fontWeight:'bold', marginRight: '50px' }}>Phone Number</label>
                <input 
                type="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="form-control" />
            </div>
            <button 
            onClick={handleRegister}
            style={{ marginTop: '3rem', marginLeft:'20%' }}
            className="btn btn-primary" 
            >Submit</button>
        </form>  
    </div>
    </div> 
    )
}

export default Register