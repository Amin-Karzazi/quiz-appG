npm start
import React from "react";
import Option from "./Option";

function Question({ question, options, selectedOption, onOptionClick }) {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option) => (
          <Option
            key={option}
            option={option}
            isSelected={option === selectedOption}
            onClick={() => onOptionClick(option)}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
