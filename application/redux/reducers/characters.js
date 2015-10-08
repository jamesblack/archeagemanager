export default function(characters = {
  characters: [],
  error: null,
}, action) {
  switch (action.type) {
    case 'CHARACTER_FAILURE': {
      return Object.assign({}, characters, {
        error: action.error,
      });
    }

    case 'CHARACTER_FETCH_SUCCESS': {
      return Object.assign({}, characters, {
        error: null,
        characters: action.characters,
      });
    }
  }

  return characters;
}
