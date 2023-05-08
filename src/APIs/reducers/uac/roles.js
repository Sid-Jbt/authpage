import { GET_ROLES_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function rolesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
