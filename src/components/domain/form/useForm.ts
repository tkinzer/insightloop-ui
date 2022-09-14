import { useState } from 'react';

/**
 * @description UseForm hook
 * State and action hook for form.
 * @returns {[{}, (e: any) => void]}
 */
export default function useForm() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setIsDirty(true);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsValid(true);
    setIsSubmitted(true);
  };
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({});
    setErrors({});
    setIsSubmitting(false);
    setIsValid(false);
    setIsDirty(false);
    setIsSubmitted(false);
  };
  const handleBlur = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };
  const handleFocus = (e: { target: { name: any } }) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };
  const validate = (name: string | number, value: string | any) => {
    const error = validations.name(value);
    return error;
  };
  /**
   * @description - This is a custom hook that will be used to validate the form.
   * Each param in validations represents a field in the form.
   * @param {string} name
   * @param {string} value
   * @returns {string}
   * @memberof useForm
   */
  const validations = {
    name: (value: any) => {
      if (!value) return 'Name is required';
      if (value.length < 3) return 'Name must be at least 3 characters';
      return '';
    },
    email: (value: any) => {
      if (!value) return 'Email is required';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Invalid email address';
      return '';
    },
    password: (value: any) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    },
    confirmPassword: (value: any) => {
      if (!value) return 'Confirm Password is required';
      // if (value !== form.password) return 'Passwords must match';
      return '';
    },
  };

  return {
    form,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    isSubmitted,
    handleChange,
    handleSubmit,
    handleReset,
    handleBlur,
    handleFocus,
    validate,
  };
}
