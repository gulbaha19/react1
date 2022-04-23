import { useCallback, useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../store/actions/fetchCharacters";

const DEFAULT_CHARACTERS_URL = "https://rickandmortyapi.com/api/character";
const DEFAULT_EPISODES_URL = "https://rickandmortyapi.com/api/episode";
const Avatar = styled("img")`
  width: 230px;
  height: 220px;
  object-fit: cover;
`;
const BoxCharacter = styled("div")`
  margin-left: 10px;
  background-color: rgb(59 62 67);
  color: white;
  width: 600px;
  height: 220px;
  margin-top: 40px;
`;
export function Characters() {
  // const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const characters = useSelector((state) => state.characters.characters);
  const dispatch = useDispatch();
  // const loadCharacters = useCallback((url = DEFAULT_CHARACTERS_URL) => {
  //   fetch(url)
  //     .then((data) => data.json())
  //     .then(({ info, results }) => {
  //       setCharacters((current) => [...current, ...results]);
  //       if (info.next) {
  //         loadCharacters(info.next);
  //       }
  //     });
  // }, []);

  const loadEpisodes = useCallback((url = DEFAULT_EPISODES_URL) => {
    fetch(url)
      .then((data) => data.json())
      .then(({ info, results }) => {
        setEpisodes((current) => [...current, ...results]);
        if (info.next) {
          loadEpisodes(info.next);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(fetchCharacters(), [dispatch]);
    loadEpisodes();
  }, [fetchCharacters, loadEpisodes]);

  return (
    <div>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={6} key={character.id}>
            <BoxCharacter>
              <Avatar src={character.image} />
              <div>
                <h2>
                  <a href={character.url} target="_blank">
                    {character.name}
                  </a>
                </h2>
              </div>
            </BoxCharacter>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
