const fetchedExpBySchool = (actionTypes) => {
  return (state = {}, action) => {
    switch (action.type) {
      case actionTypes.addSchoolFetchSuccess:
        return {
          ...state,
          [action.payload.school]: action.payload.exp,
        };
      case actionTypes.fetchSuccess:
        return {
          ...state,
          ...action.payload.updatedExpBySchool,
        };
      default:
        return state;
    }
  };
};

export default fetchedExpBySchool;
