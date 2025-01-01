import PropTypes from "prop-types";

export const CharacterStatsType = {
  str: PropTypes.number.isRequired,
  dex: PropTypes.number.isRequired,
  con: PropTypes.number.isRequired,
  int: PropTypes.number.isRequired,
  wis: PropTypes.number.isRequired,
  cha: PropTypes.number.isRequired,
};

export const CharacterType = {
  name: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  lvl: PropTypes.number.isRequired,
  ownerId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  stats: PropTypes.objectOf(CharacterStatsType.stats).isRequired,
};
