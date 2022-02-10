import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import {Link} from 'react-router-dom'
//import { getAuthUser } from '../../Redux/actions/authActions';


function Login() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, phoneNumber }))
        if(user) { 
        navigate(`/${user._id}`)
        setEmail('')
        setPhoneNumber('')
    }
    };


    return (
    <div className = "auth">
        <h1 style={{color:'white'}}>Sign In</h1>
        <p style={{color:'white'}}>If you haven't already registered, go to <Link to="/register">register</Link> page</p>
    <div className = "auth_container">
    <div className = "auth_text"></div>
    <form style={{ display:'inline' }}>
            <div className="form-group" style={{display: 'flex'}}>
                <label style={{fontWeight:'bold', marginRight:'40px' }}>Email address</label>
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
            <div className="form-group" style={{display: 'flex',  marginTop: '2rem'}}>
                <label style={{fontWeight:'bold', marginRight:'40px' }}>Phone Number</label>
                <input 
                type="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="form-control" />
            </div>
            <button 
            style={{ marginTop: '3rem', marginLeft:'20%' }}
            type="submit" 
            className="btn btn-primary" 
            onClick={handleLogin}>
                Submit
            </button>
        </form>
    </div>
    </div> 
        
    )
}

export default Login