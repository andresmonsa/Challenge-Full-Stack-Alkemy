import { SET_LOGGED, LOG_OUT } from '../actions/constants'

const initialState = {
  logged: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED:
      return { ...state, logged: action.payload }

    case LOG_OUT:
      return { ...state, logged: false }
    default:
      return state
  }
}

export default rootReducer
