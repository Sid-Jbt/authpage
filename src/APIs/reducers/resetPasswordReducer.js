import { GET_RESET_PASSWORD_SUCCESS } from '../constants';

const initialState = {};

export default function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESET_PASSWORD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
