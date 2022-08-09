import PropTypes from "prop-types";

export default function ValidationError({ childrenprops }) {
  return <div className="form-errormessage">{childrenprops}</div>;
}

ValidationError.propTypes = {
  children: PropTypes.node.isRequired,
};
