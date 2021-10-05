import axios from 'axios'
import { SET_LOGGED, LOG_OUT } from './constants'
import { ApiURL } from '../../config'

export const setLogged = (userInfo) => {
  return {
    type: SET_LOGGED,
    payload: userInfo
  }
}

export const logOut = () => {
  axios.get(`${ApiURL}/logout`, { withCredentials: true })
  return {
    type: LOG_OUT
  }
}
