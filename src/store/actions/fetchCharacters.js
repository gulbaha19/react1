export const fetchCharacters =
  ({} = {}) =>
  (dispatch) => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((data) => {
        // setCharacters((current) => [...current, ...results]);
        dispatch({
          type: "charatcters/set",
          payload: data.results,
        });
        dispatch({
          type: "charatcters/setPageInfo",
          payload: {
            page: data.page,
            total_pages: (data.total_pages, 500),
          },
        });
      });
  };
