import { GET_PROFILE_UPDATE_SUCCESS } from '../constants';

const initialState = {};

export default function profileUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
