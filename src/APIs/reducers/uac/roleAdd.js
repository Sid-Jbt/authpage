import { GET_ROLE_ADD_SUCCESS } from '../../constants';

const initialState = {};

export default function roleAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
