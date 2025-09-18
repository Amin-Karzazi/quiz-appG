import React from "react";

function Option({ option, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={isSelected ? "selected" : ""}
    >
      {option}
    </button>
  );
}

export default Option;
