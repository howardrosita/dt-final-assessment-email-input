import React, { useEffect, useState } from "react";
import { getEmails } from "../services/email.service.ts";
import SuggestionEmail from "./EmailSuggest.jsx";
import RecipientsList from "./Reciepients.jsx";
export const EmailComposer = () => {
  const [email, setEmail] = useState("");
  const [suggestionEmail, setSuggestionEmail] = useState([]);
  const [isType, setType] = useState(false);
  const [recipients, setRecipients] = useState([]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== "") {
      setEmail(e.target.value);
      setType(true);
    } else {
      setType(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || (e.key === "Tab" && email.trim() !== "")) {
      e.preventDefault();
      addEnterText(email.trim());
    }
  };
  const handleRemoveClick = (emailToRemove) => {
    setRecipients((prev) => prev.filter((r) => r.value !== emailToRemove));
  };
  const addEnterText = (newEmail) => {
    const isValid = isValidEmail(newEmail);
    const alreadyExists = recipients.some((r) => r.value === newEmail);

    if (!alreadyExists) {
      setRecipients((prev) => [...prev, { value: newEmail, isValid }]);
    }
    setEmail("");
    setType(false);
  };
  const handleSuggestionClick = (selectedEmail) => {
    const isValid = isValidEmail(selectedEmail);
    const alreadyExists = recipients.some((r) => r.value === selectedEmail);

    if (!alreadyExists) {
      setRecipients((prev) => [...prev, { value: selectedEmail, isValid }]);
    }
    setEmail("");
    setType(false);
  };
  useEffect(() => {
    setTimeout(() => {
      getEmails(email).then((data) => {
        setSuggestionEmail(Array.isArray(data) ? data : []);
      });
    }, 500);
  }, [email]);

  return (
    <div className="emailContainer">
      <ul className="textboxWrapper">
        <RecipientsList recipients={recipients} onRemove={handleRemoveClick} />
        <li>
          <input
            placeholder="Enter recipients..."
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></input>
        </li>
      </ul>
      {isType && (
        <SuggestionEmail
          suggest={suggestionEmail}
          onSelect={handleSuggestionClick}
        />
      )}
    </div>
  );
};
export default EmailComposer;
