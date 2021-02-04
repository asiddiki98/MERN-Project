/* eslint-disable import/no-anonymous-default-export */
import {
  RECEIVE_ALL_USERS, RECEIVE_USER
} from '../../actions/user_actions';

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      const users = {};
      action.users.forEach(element => { users[element._id] = element })
      return users
    case RECEIVE_USER:
      debugger;
      return Object.assign({}, state, { [action.user._id]: action.user });
    default:
      return state;
  }
}