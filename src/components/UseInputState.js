import { useState } from 'react';

export default (iniVal) => {
  const [value, setValue] = useState(iniVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue('');
  };

  return [value, handleChange, reset];
};
