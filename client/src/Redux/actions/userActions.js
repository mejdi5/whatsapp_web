import axios from 'axios';
import {GET_USERS, GET_ONE_USER, FILTER} from './ActionTypes'



//Get all users
export const getUsers = () => (dispatch) => {
    axios
    .get("http://localhost:5000/api/users/allUsers")
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) => console.log(err));
};

//Get one user
export const getOneUser = userId => (dispatch) => {
    axios
    .get(`http://localhost:5000/api/users/user/${userId}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

//Delete a user
export const deleteUser = (idUser) => (dispatch) => {
    axios
    .delete(`http://localhost:5000/api/users/delete/${idUser}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

//Update a user
export const editUser = (id, editedUser) => (dispatch) => {
    axios
    .put(`http://localhost:5000/api/users/update/${id}`, editedUser)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

export const filter = (payload) => ({
    type: FILTER,
    payload
});
