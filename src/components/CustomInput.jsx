import React from 'react'
import { useField } from "formik";

export default function CustomInput() {
  return (
    <div>CustomInput</div>
  )
}

export const TextLabelInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form_item">
      <label
        className="input_label"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        className="input_box"
        {...field}
        {...props}
        type={props.type}
      />
      {meta.touched && meta.error ? (
        <div className="red_text text_xs">{meta.error}</div>
      ) : null}
    </div>
  );
};
