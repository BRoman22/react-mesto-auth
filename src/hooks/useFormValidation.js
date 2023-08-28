import { useState } from 'react';
//кастомный хук валидации
export default function useFormValidation() {
  const newValues = {};
  const [inputs, setInputs] = useState(newValues);
  const [errors, setErrors] = useState(newValues);
  const [isValid, setIsValid] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  function resetAllForm() {
    setInputs(newValues);
    setErrors(newValues);
  }

  function resetSubmitButton() {
    setIsValid(false);
  }

  return { inputs, setInputs, errors, isValid, handleChange, resetAllForm, resetSubmitButton };
}
