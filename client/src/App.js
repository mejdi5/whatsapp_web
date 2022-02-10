import React, {useEffect} from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home'
import { Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import Register from './components/auth/Register'
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import { Spinner } from 'reactstrap';
import { getUsers } from './Redux/actions/userActions';




function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const isLoading  = useSelector((state) => state.isLoading);


  useEffect(() => {
    dispatch(getUsers());
  }, []);

/*
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }
*/
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/:authUserId" element={<Home />}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;