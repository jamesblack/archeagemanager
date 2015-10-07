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
    console.log(this.props.characters);
    return (
      <div>
        <h2>Your Characters</h2>
        { this.props.characters.yours.length ?
          <ul>
            { this.props.characters.yours.map((character, index) =>
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
          { this.props.characters.list.map((character)=>
            <ExpandableTableRow key={character._id} items={[character.name, character.player, 'Click to expand']} expandableContent={<CharacterSheet character={character} />} />
          )}
        </table>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    characters: state.characters,
  }),
  (dispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
  }))(Characters);
