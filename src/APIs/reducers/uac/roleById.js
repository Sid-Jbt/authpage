import { GET_ROLE_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function roleByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
