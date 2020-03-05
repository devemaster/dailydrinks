import * as types from '../action/actionTypes'; 
import initialState from './initialState';

export default function (state = initialState.user, action) {
  switch(action.type) {
    case types.DO_LOGIN_RES:
      return action.user
    case types.DO_FORGOTPASSWORD_RES:
      return action.user.data
    default:
      return state
  }
}