import axios from 'axios';
import {GET_MESSAGES} from './ActionTypes'


export const getMessages = (conversationId) => (dispatch) => {
    conversationId !== undefined &&
    axios
    .get(`http://localhost:5000/api/messages/${conversationId}`)
    .then((res) => dispatch({ type: GET_MESSAGES, payload: res.data }))
    .catch((err) => console.log(err));
};

export const postMessage = (newMessage, conversationId) => (dispatch) => {
    if (newMessage.conversation !== undefined) {
    axios
    .post('http://localhost:5000/api/messages', newMessage)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
    }
};

export const deleteMessage = (idMessage, conversationId) => (dispatch) => {
    axios
    .delete(`http://localhost:5000/api/messages/delete/${idMessage}`)
    .then((res) => dispatch(getMessages(conversationId)))
    .catch((err) => console.log(err));
};