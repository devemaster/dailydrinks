import * as types from '../action/actionTypes'; 
import initialState from './initialState';

export default function (state = initialState.user, action) { 
  switch(action.type) {
    case types.DO_USER_APPROVE_APP_RES:
      return action.data
    default:
      return state
  }
}