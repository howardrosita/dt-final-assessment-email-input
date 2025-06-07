import React from "react";

const RecipientsList = ({ recipients, onRemove }) => {
  return (
    <>
      {recipients.map((recipient, index) => (
        <li
          key={index}
          className={`recipient-item ${
            recipient.isValid ? "valid" : "invalid"
          }`}
        >
          <span className="email-text">{recipient.value}</span>

          {!recipient.isValid ? (
            <span
              className="icon-container invalid-icon"
              onClick={() => onRemove(recipient.value)}
              title="Invalid email"
            >
              <span className="icon-exclamation">!</span>
              <span className="icon-remove">×</span>
            </span>
          ) : (
            <span
              className="icon-container valid-remove-icon"
              onClick={() => onRemove(recipient.value)}
              title="Remove"
            >
              ×
            </span>
          )}
        </li>
      ))}
    </>
  );
};

export default RecipientsList;
