import { useState } from "react";

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
      // we use [] in order to get access to first item on file's list
      [value] = e.target.files;
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
