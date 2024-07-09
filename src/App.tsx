import React from 'react';
import type { Option } from './types';
import { FormInput, Select } from './components';

const options: Option[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const App: React.FC = () => {
  const handleSelectionChange = (selected: Option | Option[]) => {
    console.log('Selected options:', selected);
  };

  const handleSelectionAlert = (selected: Option | Option[]) => {
    alert(`Selected options: ${JSON.stringify(selected)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());
    console.log('Form payload:', payload);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <FormInput label="Name" type="text" name="name" required />
        <FormInput label="Email" type="email" name="email" required />
        <div>
          <label>
            Select:
            <Select
              options={options}
              isMulti={true}
              placeholder="Select options..."
              onSelectionChange={handleSelectionChange}
              onSelectionAlert={handleSelectionAlert}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
