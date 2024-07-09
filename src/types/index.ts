export type Option = {
    label: string;
    value: string | number;
  };
  
  export type SelectProps = {
    options: Option[];
    isMulti: boolean;
    placeholder: string;
    onSelectionChange: (selected: Option | Option[]) => void;
  };

  export type OptionItemProps = {
    option: Option;
    isMulti: boolean;
    selectedOptions: Option[];
    handleSelect: (option: Option, checked: boolean) => void;
  };
  