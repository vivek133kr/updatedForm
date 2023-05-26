import React from 'react'
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function CheckBoxType({
  item,
  values,
  errors,
  touched,
  handleChange,
  trackInputFocus,
  handleBlur,
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
      <div>
        {item.options.map((option, i) => (
          <div className="divRadio mt-4" key={i}>
            <input
              style={{ width: "20px", height: "20px" }}
              type="checkbox"
              id={`${item.name}-${i}`}
              onChange={handleChange}
              onFocus={(e) => {
                trackInputFocus(item.name, e.target.value, item.type, item.id);
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              name={item.name}
              value={option.value}
            />

            <div style={{ marginLeft: "2%" }}>
              <label
                className="label"
                htmlFor={`${item.name}-${i}`}
                style={{ cursor: "pointer" }}
              >
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
      {errors[item.name] && touched[item.name] && (
        <div className="input-feedback flex text-red-600  items-center mt-3">
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

export default CheckBoxType