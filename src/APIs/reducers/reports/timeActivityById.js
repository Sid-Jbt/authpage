import { GET_TIME_ACTIVITY_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function timeActivityByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIME_ACTIVITY_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
