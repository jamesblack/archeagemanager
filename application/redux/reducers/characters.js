export default function(characters = {
  yours: [],
  list: [],
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
        list: action.characters.list,
        yours: action.characters.yours,
      });
    }
  }

  return characters;
}
