import PropTypes from "prop-types";

export const CharacterType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
  series: PropTypes.string.isRequired,
  lvl: PropTypes.number.isRequired,
  ownerId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    str: PropTypes.number.isRequired,
    dex: PropTypes.number.isRequired,
    con: PropTypes.number.isRequired,
    int: PropTypes.number.isRequired,
    wis: PropTypes.number.isRequired,
    cha: PropTypes.number.isRequired,
  }).isRequired,
});
