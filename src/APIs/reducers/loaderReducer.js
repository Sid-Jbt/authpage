import { SET_LOADER_START, SET_LOADER_COMPLETE } from '../constants';

const initialState = {
  loading: false
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER_START:
      return {
        ...state,
        loading: action.payload.status
      };

    case SET_LOADER_COMPLETE:
      return {
        ...state,
        loading: action.payload.status
      };

    default:
      return state;
  }
}
