const SuggestionEmail = ({ suggest, onSelect }) => {
  return (
    <ul className="suggestedEmails">
      {suggest.map((suggestEmail, index) => {
        return (
          <li key={index} onClick={() => onSelect(suggestEmail)}>
            {suggestEmail}
          </li>
        );
      })}
    </ul>
  );
};

export default SuggestionEmail;
