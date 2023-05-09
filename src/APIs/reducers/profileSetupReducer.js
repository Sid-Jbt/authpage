import { GET_PROFILE_SETUP_SUCCESS } from '../constants';

const initialState = {};

export default function profileSetupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_SETUP_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
