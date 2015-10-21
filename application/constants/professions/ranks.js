const rankMap = {
  0: 'Journeyman',
  1: 'Amateur',
  2: 'Novice',
  3: 'Veteran',
  4: 'Expert',
  5: 'Master',
  6: 'Master II',
  7: 'Authority',
  8: 'Authority II',
  9: 'Champion',
};

export default function(skillValue) {
  return rankMap[Math.floor(skillValue / 10000)];
};
