import react, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MDBBtn} from 'mdb-react-ui-kit';

function Auth() {
    return (

      <div className = "auth">
        <h1 style={{color:'white'}}>Welcome to WhatsApp Web</h1>
      <div className = "auth_container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>
      <h3>Join WhatsApp</h3>
      <div className = "auth_text">
        you'll get fast, simple, secure messaging
        and calling for free, available on
        phones all over the world.
      </div>
        <div style={{display:'flex', justifyContent:'space-around', marginTop:'50px'}}>
        <Link to="/register">
          <MDBBtn>Register</MDBBtn>
        </Link>
        <Link to="/login">
        <MDBBtn color='success'>Login</MDBBtn>
        </Link>
        </div>
      </div>
      </div> 
    )
  }

export default Auth