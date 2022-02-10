import axios from 'axios';
import {GET_GROUP_CONVERSATIONS} from './ActionTypes'

//get group conversations of one user
export const getGroupConversations = (userId) => (dispatch) => {
    axios
    .get(`http://localhost:5000/api/groupConversations/${userId}`)
    .then((res) => dispatch({ type: GET_GROUP_CONVERSATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};

//post a new group conversation
export const postGroupConversation = (newGroupConversation, userId) => (dispatch) => {
    axios
    .post('http://localhost:5000/api/groupConversations', newGroupConversation)
    .then((res) => dispatch(getGroupConversations(userId)))
    .catch((err) => console.log(err));
};