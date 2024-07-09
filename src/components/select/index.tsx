/* eslint-disable no-debugger */
import React, { useState, useEffect } from "react";
import type { Option } from "../../types";
import { OptionItem } from "../option-item";

type SelectProps = {
  options: Option[];
  isMulti: boolean;
  placeholder: string;
  onSelectionChange: (selected: Option | Option[]) => void;
  onSelectionAlert?: (selected: Option | Option[]) => void;
};

export const Select: React.FC<SelectProps> = ({
  options,
  isMulti,
  placeholder,
  onSelectionChange,
  onSelectionAlert,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (selectedOptions.length > 0) {
      const selected = isMulti ? selectedOptions : selectedOptions[0];
      onSelectionChange(selected);
      if (onSelectionAlert) onSelectionAlert(selected);
    }
  }, [selectedOptions, isMulti, onSelectionChange, onSelectionAlert]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {

    if (isMulti) {
      setSelectedOptions((prev) => {
        if (prev.includes(option)) {
          return prev.filter((item) => item !== option);
        } else {
          return [...prev, option];
        }
      });
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  const getSelectedOptionsString = () => {
    const selectedString = selectedOptions
      .map((option) => option.label)
      .join(", ");
    return selectedString.length > 24
      ? `${selectedString.slice(0, 20)}...`
      : selectedString;
  };

  return (
    <div className="select-container">
      <div className="select-header" onClick={toggleOpen}>
        {selectedOptions.length > 0 ? getSelectedOptionsString() : placeholder}
      </div>
      {isOpen && (
        <div className="select-body">
          {isMulti && (
             <div>
             <label>
               <span className="select-all" onClick={handleSelectAll}>Select/Deselect All</span>
             </label>
           </div>
          )}
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div className="options-list">
            {filteredOptions.map((option) => (
              <OptionItem
                key={option.value}
                option={option}
                isMulti={isMulti}
                selectedOptions={selectedOptions}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
