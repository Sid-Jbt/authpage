import { GET_ORGANISATION_PROFILE_UPDATE_SUCCESS } from '../constants';

const initialState = {};

export default function organisationProfileUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANISATION_PROFILE_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
