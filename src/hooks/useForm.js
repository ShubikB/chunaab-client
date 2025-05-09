import { useState } from 'react';
import { toast } from 'react-toastify';

const useForm = (initialValue, validationSchema) => {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e, cb) => {
    console.log(e, cb);
    e.preventDefault();

    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});
      cb();
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setForm({ ...initialValue });
  };

  return { form, handleOnChange, handleOnSubmit, errors, resetForm };
};

export default useForm;
