import { GET_DOMAIN_SUCCESS } from '../constants';

const initialState = {};

export default function domainReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOMAIN_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
