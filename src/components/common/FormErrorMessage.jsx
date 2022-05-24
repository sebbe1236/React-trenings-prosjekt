import PropTypes from "prop-types";

export default function ValidationError({ childrenprops }) {
  return <div className="form-errormessage">{childrenprops}</div>;
}

ValidationError.proptTypes = {
  children: PropTypes.node.isRequired,
};
