import { GET_SUPPORT_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function supportByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPORT_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
