const initialState = {data: {}};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TEAM':
      return {...state, data: action.payload};

    default:
      return state;
  }
};
