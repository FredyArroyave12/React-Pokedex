export const actionTypes = {
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  MODIFY_MOBILE: 'MODIFY_MOBILE',
};

export const updateSearch = (searchContent) => {
  return {
    type: actionTypes.UPDATE_SEARCH,
    payload: {
      searchContent,
    },
  };
};

export const changeMobileItemsStatus = () => {
  return {
    type: actionTypes.MODIFY_MOBILE,
  };
};
