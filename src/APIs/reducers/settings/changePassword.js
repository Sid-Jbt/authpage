import { GET_CHANGE_PASSWORD_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
