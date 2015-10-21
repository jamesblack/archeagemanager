import { PROFESSIONS } from '../../constants';
import _ from 'lodash';

export default function(professions = {
  harvesting: {},
  refining: {},
  misc: {},
}, action) {
  switch (action.type) {

    case 'CHARACTER_FETCH_SUCCESS': {
      let newProfessions = {
        harvesting: {},
        refining: {},
        misc: {},
      };

      action.characters.map((character) => {
        PROFESSIONS.harvesting.forEach((professionName) => {
          if (!newProfessions.harvesting[professionName]) newProfessions.harvesting[professionName] = [];

          newProfessions.harvesting[professionName].push({
            name: character.name,
            skill: character.professions.harvesting[professionName].value,
            preferred: character.professions.harvesting[professionName].preferred
          });
        });
        PROFESSIONS.refining.forEach((professionName) => {
          if (!newProfessions.refining[professionName]) newProfessions.refining[professionName] = [];

          newProfessions.refining[professionName].push({
            name: character.name,
            skill: character.professions.refining[professionName].value,
            preferred: character.professions.refining[professionName].preferred
          });
        });
        PROFESSIONS.misc.forEach((professionName) => {
          if (!newProfessions.misc[professionName]) newProfessions.misc[professionName] = [];

          newProfessions.misc[professionName].push({
            name: character.name,
            skill: character.professions.misc[professionName].value,
            preferred: character.professions.misc[professionName].preferred
          });
        });
      });

      PROFESSIONS.harvesting.map((professionName) => {
        newProfessions.harvesting[professionName] = _.sortByOrder(newProfessions.harvesting[professionName], ['skill'], ['desc']);
      });
      PROFESSIONS.refining.map((professionName) => {
        newProfessions.refining[professionName] = _.sortByOrder(newProfessions.refining[professionName], ['skill'], ['desc']);
      });
      PROFESSIONS.misc.map((professionName) => {
        newProfessions.misc[professionName] = _.sortByOrder(newProfessions.misc[professionName], ['skill'], ['desc']);
      });

      return {
        harvesting: newProfessions.harvesting,
        refining: newProfessions.refining,
        misc: newProfessions.misc,
      };
    }
  }

  return professions;
}
