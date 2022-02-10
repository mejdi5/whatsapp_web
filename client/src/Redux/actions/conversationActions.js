import axios from 'axios';
import {GET_CONVERSATIONS} from './ActionTypes'

//get conversations of one user
export const getConversations = (userId) => (dispatch) => {
    axios
    .get(`http://localhost:5000/api/conversations/${userId}`)
    .then((res) => dispatch({ type: GET_CONVERSATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};


export const postConversation = (newConversation, userId) => (dispatch) => {
    axios
    .post('http://localhost:5000/api/conversations', newConversation)
    .then((res) => dispatch(getConversations(userId)))
    .catch((err) => console.log(err));
};


export const deleteConversation = (idConversation) => (dispatch) => {
    axios
    .delete(`http://localhost:5000/api/conversations/delete/${idConversation}`)
    .then((res) => dispatch(getConversations()))
    .catch((err) => console.log(err));
};
