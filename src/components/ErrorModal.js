//new UI component to display error messages in a div

import React from 'react';

import './ErrorModal.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>Oh no!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" id = "errorButton" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
