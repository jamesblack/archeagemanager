import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCharacters } from '../../redux/actions/characters';
import ExpandableTableRow from '../expandableTableRow/expandableTableRow';
import CharacterSheet from '../characterSheet/characterSheet';

class Characters extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharacters();
  }

  render() {
    let characters = { yours: [], list: [] };
    if (this.props.characters) {
      characters = this.props.characters.reduce((characters, character) => {
        if (character.owner === this.props.user.href) {
          characters.yours.push(character);
        } else {
          characters.list.push(character);
        }
        return characters;
      }, characters);
    }



    return (
      <div>
        <h2>Your Characters</h2>
        { characters.yours.length ?
          <ul>
            { characters.yours.map((character, index) =>
              <li key={index}><Link to={`/characters/edit/${character._id}`}>Edit {character.name}</Link></li>
            )}
          </ul>
          :
          null
        }
        <Link to='/characters/edit'>Add a Character</Link>
        <h2>Character List</h2>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Character Name</th>
              <th>Player Name</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          { characters.list.map((character)=>
            <ExpandableTableRow key={character._id} items={[character.name, character.player, 'Click to expand']} expandableContent={<CharacterSheet character={character} />} />
          )}
        </table>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    characters: state.characters.characters,
    user: state.user,
  }),
  (dispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
  }))(Characters);
