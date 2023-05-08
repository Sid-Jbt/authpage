import { GET_ROLE_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function roleUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
