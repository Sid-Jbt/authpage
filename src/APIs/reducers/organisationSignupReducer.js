import { GET_ORGANISATION_SIGNUP_SUCCESS } from '../constants';

const initialState = {};

export default function organisationSignupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANISATION_SIGNUP_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
