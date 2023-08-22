import { useState, useCallback } from 'react';

export default function useFormValidation() {
  const newValues = { name: '', about: '', place: '', link: '', avatar: '' };
  const [inputs, setInputs] = useState(newValues);
  const [errors, setErrors] = useState(newValues);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (inputName, e) => {
    setInputs({ ...inputs, [inputName]: e.target.value });
    setErrors({ ...errors, [inputName]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  function resetAllForm() {
    setInputs(newValues);
    setErrors(newValues);
  }

  function resetSubmitButton(newIsValid = false) {
    setIsValid(newIsValid);
  }

  return { inputs, setInputs, errors, isValid, handleChange, resetAllForm, resetSubmitButton };
}
