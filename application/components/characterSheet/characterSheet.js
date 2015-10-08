import React from 'react';
import { PROFESSIONS } from '../../constants';

class CharacterSheet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Character Sheet for {this.props.character.name}</h3>
        <section>
          {
            Object.keys(this.props.character.professions.harvesting).map((skillName, index) => {
              let skill = this.props.character.professions.harvesting[skillName];
              return (
                <div key={index}>
                  <h4>{skillName}</h4>
                  <h5>{skill.value}</h5>
                  <h6>{Math.floor(skill.value / 10000)}</h6>
                </div>
              );
            })
          }
        </section>
      </div>
    );
  }

}

export default CharacterSheet;
