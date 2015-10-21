import React from 'react';
import { PROFESSIONS, PROFESSION_RANKS } from '../../constants';

class CharacterSheet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className='lead'>Character Sheet for {this.props.character.name}</h3>
        {
          Object.keys(this.props.character.professions.harvesting).map((skillName, index) => {
            let skill = this.props.character.professions.harvesting[skillName];
            return (
              <div className='col-xs-2' key={index}>
                <div className='well well-sm text-center'>
                  <h4>{skillName}</h4>
                  <h5>Prof. {skill.value}</h5>
                  <h6>{PROFESSION_RANKS(skill.value)}</h6>
                </div>
              </div>
            );
          })
        }
        {
          Object.keys(this.props.character.professions.refining).map((skillName, index) => {
            let skill = this.props.character.professions.refining[skillName];
            return (
              <div className='col-xs-2' key={index}>
                <div className='well well-sm text-center'>
                  <h4>{skillName}</h4>
                  <h5>Prof. {skill.value}</h5>
                  <h6>{PROFESSION_RANKS(skill.value)}</h6>
                </div>
              </div>
            );
          })
        }
        {
          Object.keys(this.props.character.professions.misc).map((skillName, index) => {
            let skill = this.props.character.professions.misc[skillName];
            return (
              <div className='col-xs-2' key={index}>
                <div className='well well-sm text-center'>
                  <h4>{skillName}</h4>
                  <h5>Prof. {skill.value}</h5>
                  <h6>{PROFESSION_RANKS(skill.value)}</h6>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default CharacterSheet;
