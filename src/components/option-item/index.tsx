import React from "react";
import type { OptionItemProps } from "../../types";

export const OptionItem: React.FC<OptionItemProps> = ({
  option,
  isMulti,
  selectedOptions,
  handleSelect,
}) => {
  const { label } = option;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelect(option, e.target.checked);
  };

  const handleClick = () => {
    if (!isMulti) {
      handleSelect(option, true); 
    }
  };

  return (
    <div key={option.value} className="option-item">
      {isMulti && (
        <input
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={handleChange}
        />
      )}
      {!isMulti && (
        <div
          className={`option-label ${
            selectedOptions.includes(option) ? "selected" : ""
          }`}
          onClick={handleClick}
        >
          {label}
        </div>
      )}
      {label}
    </div>
  );
};
