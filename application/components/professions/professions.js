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
    console.log(this.props.professions);

    let generateProfessionList = (professionType) => PROFESSIONS[professionType].map((skillName, index) => (
      <div className='text-center' style={{ width: 150 }}>
        <section className='well well-sm' key={index}>
          <h4 className='lead'>{skillName}</h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {(() => {
              if (!this.props.professions[professionType][skillName]) return <li className='collecting'>Collecting Data</li>;
              return this.props.professions[professionType][skillName].slice(0, 5).map((info) =>
                <li className={classNames({ 'bg-success': info.preferred })} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{info.name}</span>
                  <span>{info.skill}</span>
                </li>
              );
            })()}
          </ul>
        </section>
      </div>
    ));

    return (
      <div className='col-xs-12' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        { generateProfessionList('harvesting') }
        { generateProfessionList('refining') }
        { generateProfessionList('misc') }
      </div>
    );
  }

}

export default connect(
  (state) => ({
    characters: state.characters.characters,
    professions: state.professions,
  }),
  (dispatch) => ({
    fetchCharacters: () => dispatch(fetchCharacters()),
  }))(Professions);
