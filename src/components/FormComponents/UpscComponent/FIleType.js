import React from 'react'
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
function FIleType({
   item, 
   values,
    errors,
    touched,
    handleChange,
    trackInputFocus,
    handleBlur
}) {
  return (
    <div
      key={item.id}
      style={{ borderRadius: "8px" }}
      className={`bg-white p-5 mt-3 ${
        errors[item.name] && touched[item.name]
          ? "border border-red-500"
          : "border"
      }`}
    >
      <label
        htmlFor={item.name}
        style={{ display: "block" }}
        className="font-normal font-medium text-base leading-6 inputLabel"
      >
        {item.label}
        <span className="text-red-600">{item.required ? " * " : ""}</span>
      </label>
      <input
        id={item.name}
        name={item.name}
        placeholder="Your answer"
        type={item.type === "tel" ? "number" : item.type}
        inputMode={item.type === "tel" ? "numeric" : undefined}
        value={values[item.name]}
        onChange={handleChange}
        onFocus={(e) => {
          trackInputFocus(item.name, e.target.value, item.type, item.id);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
        onKeyPress={(e) => {
          if (item.type === "tel" && !/^\d$/.test(e.key)) {
            e.preventDefault();
          }
          if (
            item.type === "text" &&
            item.text_only == true &&
            /^\d$/.test(e.key)
          ) {
            e.preventDefault();
          }
        }}
        className={`mt-7 mb-3 inputBox focus:outline-none ${
          errors[item.name] && touched[item.name]
            ? "text-input error"
            : "text-input"
        }`}
      />

      {errors[item.name] && touched[item.name] && (
        <div className="input-feedback flex text-red-600  items-center">
          <span>
            <ErrorOutlineIcon />
          </span>
          <span style={{ marginLeft: "1%" }} className="errorStyle">
            {errors[item.name]}
          </span>
        </div>
      )}
    </div>
  );
}

export default FIleType