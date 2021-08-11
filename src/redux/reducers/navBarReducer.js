import { actionTypes } from '../actions/navBarActions';

const initialState = {
  isMobileItemsActive: false,
};

const navBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_MOBILE:
      return {
        ...state,
        isMobileItemsActive: !state.isMobileItemsActive,
      };
    default:
      return state;
  }
};

export default navBarReducer;
