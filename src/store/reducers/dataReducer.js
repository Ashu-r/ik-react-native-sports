const initialState = {data: {}, filters: [], favorites: []};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_DRILLS':
      const newState = {};
      Object.keys(action.payload).map(k => {
        newState[k] = action.payload[k].map(data => data.id);
      });
      return {...state, data: newState};
    case 'ADD_FILTER':
      return {...state, filters: [...state.filters, action.payload]};
    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: state.filters.filter(f => f !== action.payload),
      };
    case 'ADD_FAV':
      return {...state, favorites: [...state.favorites, action.payload]};
    case 'REMOVE_FAV':
      return {
        ...state,
        favorites: state.favorites.filter(f => f !== action.payload),
      };
    default:
      return state;
  }
};
