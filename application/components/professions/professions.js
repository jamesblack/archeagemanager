import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacters } from '../../redux/actions/characters';
import { PROFESSIONS } from '../../constants';
import classNames from 'classnames';

class Professions extends React.Component {

  onClick() {
    console.log('lol');
  }

  componentDidMount() {
    this.props.fetchCharacters();
  }

  render() {
    console.log(this.props.characters)
    return (
      <div className='professionSheet'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th className='rotate'>&nbsp;</th>
              <th className='rotate'>&nbsp;</th>
              { PROFESSIONS.harvesting.map((name) => <th className='rotate'><div><span>{name}</span></div></th>)}
              <th className='rotate'>&nbsp;</th>
              { PROFESSIONS.refining.map((name) => <th className='rotate'><div><span>{name}</span></div></th>)}
              <th className='rotate'>&nbsp;</th>
              { PROFESSIONS.misc.map((name) => <th className='rotate'><div><span>{name}</span></div></th>)}
            </tr>
          </thead>
          <tbody>
            { this.props.characters && this.props.characters.map((character) =>
              <tr>
                <td>{character.name}</td>
                <td>&nbsp;</td>
                { PROFESSIONS.harvesting.map((skillName) =>
                  <td className={classNames({ preferred: character.professions.harvesting[skillName].preferred })}>{character.professions.harvesting[skillName].value}</td>
                )}
                <td>&nbsp;</td>
                { PROFESSIONS.refining.map((skillName) =>
                  <td className={classNames({ preferred: character.professions.refining[skillName].preferred })}>{character.professions.refining[skillName].value}</td>
                )}
                <td>&nbsp;</td>
                { PROFESSIONS.misc.map((skillName) =>
                  <td className={classNames({ preferred: character.professions.misc[skillName].preferred })}>{character.professions.misc[skillName].value}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    characters: state.characters.characters,
  }),
  (dispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
  }))(Professions);
