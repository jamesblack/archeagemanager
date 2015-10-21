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

    let generateCharacterTable = (characters, editable = false) => {
      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Character Name</th>
              <th>&nbsp;</th>
              {(() => {
                if (editable) return <th>&nbsp;</th>;
              })()}
            </tr>
          </thead>
          {characters.map((character) =>
            <ExpandableTableRow
              key={character._id}
              items={(() => {
                let items = [character.name, 'Click to expand'];
                if (editable) items.push(<Link to={`/characters/edit/${character._id}`}>Edit {character.name}</Link>);
                return items;
              })()}
              expandableContent={<CharacterSheet character={character} />} />
          )}
        </table>
      );
    };



    return (
      <div>
        <h2 className='lead'>Your Characters <small><Link to='/characters/edit'>Add a Character</Link></small></h2>
        { generateCharacterTable(characters.yours, true) }
        <h2 className='lead'>Character List</h2>
        { generateCharacterTable(characters.list) }
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
