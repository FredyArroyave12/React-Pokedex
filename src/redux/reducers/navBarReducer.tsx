import { actionTypes } from '../actions/navBarActions';
interface payload {
  searchContent: string;
  isMobileItemsActive: boolean;
}
const initialState = {
  searchContent: '',
  isMobileItemsActive: false,
};

const navBarReducer = (
  state = initialState,
  action: {
    type: string;
    payload: payload;
  }
) => {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH:
      return {
        ...state,
        ...action.payload,
      };
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
