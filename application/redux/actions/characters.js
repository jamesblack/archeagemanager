import request from 'superagent';

export function fetchCharacters() {
  return (dispatch) => {
    dispatch({
      type: 'CHARACTER_FETCH_REQUEST',
    });

    request.get('/api/characters')
      .end((error, result) => {
        if (error) return dispatch({ type: 'CHARACTER_FAILURE', error});

        return dispatch({ type: 'CHARACTER_FETCH_SUCCESS', characters: result.body });
      });

  };
}

export function createCharacter(character) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: 'CHARACTER_CREATE_REQUEST',
      });

      request.post('/api/characters')
        .type('json')
        .send(character)
        .end((error, result) => {
          if (error) return dispatch({ type: 'CHARACTER_FAILURE', error });

          dispatch({ type: 'CHARACTER_CREATE_SUCCESS', character: result.body });
          return resolve();
        });
    });
  };
}

export function editCharacter(id, character) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: 'CHARACTER_EDIT_REQUEST',
      });

      request.post(`/api/characters/${id}`)
        .type('json')
        .send(character)
        .end((error, result) => {
          if (error) return dispatch({ type: 'CHARACTER_FAILURE', error });

          dispatch({ type: 'CHARACTER_EDIT_SUCCESS', character: result.body });
          return resolve();
        });
    });
  };
}
