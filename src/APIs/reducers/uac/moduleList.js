import { GET_MODULE_LIST_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function moduleListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MODULE_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
