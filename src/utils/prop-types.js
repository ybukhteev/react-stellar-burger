import PropTypes from "prop-types";

export const ingridientType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
  id_: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});

export default ingridientType;