import React from 'react';
import request from 'superagent';
import _ from 'lodash';
import { createCharacter, editCharacter } from '../../redux/actions/characters';
import { connect } from 'react-redux';
import classNames from 'classnames';

const PROFESSIONS = {
  harvesting: [
    'Husbandry',
    'Farming',
    'Fishing',
    'Logging',
    'Gathering',
    'Mining',
  ],
  refining: [
    'Alchemy',
    'Cooking',
    'Handicrafts',
    'Machining',
    'Metalwork',
    'Printing',
    'Masonry',
    'Tailoring',
    'Leatherwork',
    'Weaponry',
    'Carpentry',
  ],
  misc: [
    'Construction',
    'Larceny',
    'Commerce',
    'Artistry',
    'Exploration',
  ],
};

class CharacterEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      character: null,
      error: null,
    };
  }

  componentDidMount() {
    this.getCharacter(this.props.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) this.getCharacter(this.props.params.id);
  }

  getCharacter(id) {
    if (!id) return this.setState({
      character: {
        professions: {
          harvesting: {},
          refining: {},
          misc: {},
        },
      },
    });

    request.get(`/api/characters/${id}`).end((error, results) => {
      if (error) return this.setState({ error });
      return this.setState({ character: results.body });
    });
  }

  submit(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.params.id) {
      return this.props.editCharacter(this.props.params.id, this.state.character).then((result) => {
        this.props.history.pushState(null, '/characters');
      });
    }

    this.props.createCharacter(this.state.character).then((result) => {
      this.props.history.pushState(null, '/characters');
    });
  }

  onChangeField(key, event) {
    let newCharacter = Object.assign({}, this.state.character);
    if (event.target.type === 'button') {
      _.set(newCharacter, key, !_.get(newCharacter, key));
    } else {
      _.set(newCharacter, key, event.target.value);
    }

    this.setState({
      character: newCharacter,
    });
  }

  render() {
    let tabOrder = 1;
    let drawProfessionFields = (skillType) => (professionKey, index) => {
      let value = this.state.character.professions[skillType][professionKey] && this.state.character.professions[skillType][professionKey].value || '';
      let preferred = this.state.character.professions[skillType][professionKey] && this.state.character.professions[skillType][professionKey].preferred || false;
      return (
        <div className='well'>
          <div key={professionKey} className='form-group' style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <label htmlFor={`${skillType}.${professionKey}`}>{professionKey}</label>
              <input
                style={{marginLeft: 12}}
                type='text'
                className='form-control'
                id={`${skillType}.${professionKey}`}
                placeholder='Level'
                value={value}
                tabIndex={tabOrder++}
                onChange={this.onChangeField.bind(this, `professions.${skillType}.${professionKey}.value`)} />
            </div>
            <button
              type='button'
              style={{marginTop: 12}}
              className={classNames({ 'btn': true, 'btn-success': preferred })}
              onClick={this.onChangeField.bind(this, `professions.${skillType}.${professionKey}.preferred`)}
              >Preferred</button>
          </div>
        </div>
      );
    };

    if (!this.state.character && !this.state.error) return (<h2>Loading</h2>);

    return (
      <div>
        <h2>{this.props.params.id ? `Editing ${this.state.character.name}` : 'Creating a new Character'}</h2>
        <form onSubmit={this.submit.bind(this)} className='col-xs-12'>
          <section className='row'>
            <header>
              <h2 className='lead'>Vitals</h2>
            </header>
            <main>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' className='form-control' id='name' placeholder='Character Name' value={this.state.character.name} onChange={this.onChangeField.bind(this, 'name')} />
              </div>
            </main>
          </section>
          <section className='row'>
            <header>
              <h2 className='lead'>Skills</h2>
            </header>
            <main className='skills'>
              <section className='col-xs-4'>
                <h3 className='lead text-center'>Harvesting</h3>
                {PROFESSIONS.harvesting.map(drawProfessionFields('harvesting'))}
              </section>
              <section className='col-xs-4'>
                <h3 className='lead text-center'>Refining</h3>
                {PROFESSIONS.refining.map(drawProfessionFields('refining'))}
              </section>
              <section className='col-xs-4'>
                <h3 className='lead text-center'>Misc.</h3>
                {PROFESSIONS.misc.map(drawProfessionFields('misc'))}
              </section>
            </main>
          </section>

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }

}

export default connect(
  () => ({}),
  (dispatch) => ({
    createCharacter: (character) => dispatch(createCharacter(character)),
    editCharacter: (id, character) => dispatch(editCharacter(id, character)),
  }))(CharacterEditor);
