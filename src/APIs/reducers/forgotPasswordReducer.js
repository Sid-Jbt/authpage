import { GET_FORGOT_PASSWORD_SUCCESS } from '../constants';

const initialState = {};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
