import React, { useEffect, useState } from "react";
import { getEmails } from "../services/email.service";

export const EmailComposer = () => {
  const [email, setEmail] = useState("");
  const [suggestionEmail, setSuggestionEmail] = useState("");
  const [isType, setType] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    isType(true);
  };

  useEffect(() => {
    setTimeout(() => {
      getEmails(email).then((data) => {
        setSuggestionEmail(data);
      });
    }, 500);
  }, [email]);

  return (
    <div>
      <ul>
        <li>
          <input
            placeholder="Enter recipients..."
            onChange={handleInputChange}
          ></input>
        </li>
      </ul>
    </div>
  );
};
export default EmailComposer;
