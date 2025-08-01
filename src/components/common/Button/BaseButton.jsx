import "./BaseButton.css";

import PropTypes from "prop-types";

const BaseButton = ({ children, ...props }) => {
  return (
    <button className="base-button" {...props}>
      <div className="circle-bg-btn"></div>
      <div className="btn-link">{children}</div>
    </button>
  );
};

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseButton;
