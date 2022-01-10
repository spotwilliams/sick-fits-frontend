import { useState } from "react";
import { func } from "prop-types";

export default function useForm(initial = {}) {
  // Create a state object for our inputs

  const [inputs, setInputs] = useState(initial);

  // Our data will have the shape of:
  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }x

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = Number.parseInt(value);
    }

    if (type === "file") {
      value[0] = value.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, ""]);

    setInputs(Object.fromEntries(blankState));
  }

  return { inputs, handleChange, resetForm, clearForm };
}
