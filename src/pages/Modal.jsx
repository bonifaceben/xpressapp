import React from "react";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-icon"
          >
            <path className="check-path" d="M9 11l3 3L22 4" />
          </svg>
        </div>
        <h5>{message}</h5>
        <button onClick={onClose}>Verify Now</button>
      </div>
    </div>
  );
}

export default Modal;
