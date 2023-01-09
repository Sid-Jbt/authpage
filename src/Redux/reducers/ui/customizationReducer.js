import * as actionTypes from '../../actions/ui/actions';

export const initialState = {
  isOpen: [], // for active default menu
  opened: true
};

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    default:
      return state;
  }
};

export default customizationReducer;
