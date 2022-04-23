const initState = {
  characters: [],
  pageInfo: {
    page: 1,
    total_pages: 0,
  },
};
export function characters(state = initState, action) {
  const newState = { ...state };
  switch (action.type) {
    case "characters/set":
      newState.characters = action.payload;
      break;
    case "chatacter/setPageInfo":
      newState.pageInfo = action.payload;
      break;
    default:
      return state;
  }
  return newState;
}
