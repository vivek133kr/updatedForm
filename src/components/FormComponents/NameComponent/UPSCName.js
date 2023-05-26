import React, { useEffect,  useRef, useState } from "react";
import { Formik } from "formik";

import "@fontsource/roboto";
import * as Yup from "yup";

import "../../../App.css";

import { useParams } from "react-router-dom";
import { hotjar } from "react-hotjar";
const RadioType = React.lazy(() => import("../UpscComponent/RadioType"));
const CheckBoxType = React.lazy(() => import("../UpscComponent/CheckBoxType"));
const StatementType = React.lazy(() => import("../UpscComponent/StatementType"));
const ButtonType = React.lazy(() => import("../UpscComponent/ButtonType"));

const FIleType = React.lazy(() => import("../UpscComponent/FIleType"));
function UPSCName({ allData, fields, setSubmitted }) {
  useEffect(() => {
    hotjar.initialize(3503164, 6);
  }, []);
  const formFieldsRef = useRef({});
  let [dataFilled, setDataFilled] = useState({});
  let refData = useRef([]);
  const [widthTotal, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: widthTotal > "800" ? "400px" : "80vw",
    bgcolor: "background.paper",

    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    pb: 0,
  };
  let [loading, setLoading] = useState(false);
  let [Ipstate, setIp] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userIP = useRef("");
  let previousName = useRef("");
  const fetchUserIP = async () => {
    let newres;
    let res = await fetch("https://api64.ipify.org/?format=json")
      .then((res) => res.json())
      .then((res) => {
        newres = res;
        userIP.current = res.ip;
        setIp(res.ip);
      });

    return newres;
  };
  useEffect(() => {
    let res = fetchUserIP();

    userIP.current = res.ip;
  }, []);
  const formLoadCalled = useRef(false);
  const handleFormLoad = async () => {
    let data = {
      impression_id: allData.impression_id,
      form: id,
      field_id: null,
      event_name: "FORM_LOADED",
      ip_address: Ipstate,
    };

    await fetch(" https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, " check line when form is loaded"));
    console.log("hello line 34");
  };

  useEffect(() => {
    if (Ipstate.length > 0) {
      if (!formLoadCalled.current) {
        handleFormLoad();
        formLoadCalled.current = true;
      }
    }
  }, [Ipstate]);
  const { id } = useParams();
  let [fieldsData, setFieldsData] = useState([]);
  let [change, setChange] = useState(false);

  let [initialValues, setInitialValues] = useState({});
  const handleFieldsFilled = async (fieldId) => {
    let data = {
      impression_id: allData.impression_id,
      form: id,
      field_id: fieldId,
      event_name: "FIELD_FILLED",
      ip_address: userIP.current ? userIP.current : Ipstate,
    };
    await fetch("https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, " check line when form is filled"));
  };
  let [validationSchema, setValidationSchema] = useState({});
  const trackInputFocus = async (fieldName, value, type, InputId) => {
    let data = {
      impression_id: allData.impression_id,
      form: id,
      field_id: InputId,
      event_name: "FIELD_INTERACTED",
      ip_address: userIP.current ? userIP.current : Ipstate,
    };
    await fetch(" https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, " check line when form is interacted"));
  };
  const getFieldsData = () => {
    let k = fields;
    let finalobj = [];

    for (let data in k) {
      let obj = k[data];
      obj.name = obj.name.toString().toLowerCase().split(" ").join("");
      const regex = /[^a-zA-Z0-9]/g; // match any character that is not a letter or digit
      obj.name = obj.name.replace(regex, "");

      finalobj.push(obj);
    }
    return finalobj;
  };
  useEffect(() => {
    setFieldsData(getFieldsData());
    setValidationSchema(validationNewSchema()); // call validationNewSchema here
    setInitialValues(getInitialValues(fields)); // call getInitialValues here
  }, [fields, change]);

  const getInitialValues = (fieldsData) => {
    let fieldObject = {};
    refData.current = fieldsData;
    for (let field in fieldsData) {
      if (
        fieldsData[field].type == "file" &&
        fieldsData[field].max_file_allowed != null &&
        fieldsData[field].max_file_allowed > 1
      ) {
        fieldObject[fieldsData[field].name] = [];
      } else if (
        fieldsData[field].type == "file" &&
        fieldsData[field].max_file_allowed != null &&
        fieldsData[field].max_file_allowed == 1
      ) {
        fieldObject[fieldsData[field].name] = [];
      } else {
        fieldObject[fieldsData[field].name] = "";
      }
    }

    setInitialValues(fieldObject);

    return fieldObject;
  };

  const validationNewSchema = () => {
    let obj = {};
    for (let field in fieldsData) {
      if (fieldsData[field].required == true) {
        if (
          fieldsData[field].type == "file" &&
          fieldsData[field].max_file_allowed > 1
        ) {
          obj[fieldsData[field].name] = Yup.array()

            .min(1, `At least one image is required`)
            .max(
              fieldsData[field].max_file_allowed,
              `No more than ${fieldsData[field].max_file_allowed} images are allowed`
            )
            .required("This is a required question");
        } else if (
          fieldsData[field].type == "file" &&
          fieldsData[field].max_file_allowed == 1
        ) {
          obj[fieldsData[field].name] = Yup.array()
            .length(
              fieldsData[field].max_file_allowed,
              `Images must be ${fieldsData[field].max_file_allowed}`
            )
            .required("This is a required question");
        } else if (fieldsData[field].type === "location") {
          obj[fieldsData[field].name] = Yup.string()
            .test(
              "location",
              "Location can't be fetched. Allow Location Permission and try again.",
              (value) => value !== "Error Fetching Location"
            )
            .required("This is a required question");
        } else if (fieldsData[field].type == "checkbox") {
          obj[fieldsData[field].name] = Yup.array().required(
            "This is a required question"
          );
        } else if (fieldsData[field].type == "email") {
          obj[fieldsData[field].name] = Yup.string()
            .email("This should be a valid email address")
            .matches(
              /^.+\.[A-Za-z]{2,}$/,
              "This should be a valid email address"
            )
            .required("This is a required question");
        } else if (fieldsData[field].type == "number") {
          obj[fieldsData[field].name] = Yup.number()
            .typeError("This should be a valid number")
            .required("This is a required question");
        } else if (fieldsData[field].type == "tel") {
          obj[fieldsData[field].name] = Yup.string()
            .matches(
              /^(0\d{10}|\d{10})$/, // Modified pattern to allow optional leading zero
              "This should be a valid 10 digits phone number"
            )
            .required("This is a required question");
        } else {
          if (
            fieldsData[field].type == "text" &&
            fieldsData[field].text_only == true &&
            fieldsData[field].length > 0
          ) {
            obj[fieldsData[field].name] = Yup.string()
              .matches(
                /^[a-zA-Z\s]*$/,
                "This field should not contain numbers or special characters"
              )
              .max(
                fieldsData[field].length,
                `This field should not exceed ${fieldsData[field].length} characters`
              )
              .required("This is a required question");
          } else if (
            fieldsData[field].type === "text" &&
            fieldsData[field].text_only === true &&
            fieldsData[field].length === 0
          ) {
            obj[fieldsData[field].name] = Yup.string()
              .matches(
                /^[a-zA-Z\s]*$/,
                "This field should not contain numbers or special characters"
              )
              .required("This is a required question");
          } else if (
            fieldsData[field].type === "text" &&
            fieldsData[field].text_only === false &&
            fieldsData[field].length > 0
          ) {
            obj[fieldsData[field].name] = Yup.string()
              .max(
                fieldsData[field].length,
                `This field should not exceed ${fieldsData[field].length} characters`
              )
              .required("This is a required question");
          } else {
            obj[fieldsData[field].name] = obj[fieldsData[field].name] =
              Yup.string().required("This is a required question");
          }
        }
      } else {
        if (
          fieldsData[field].required == false &&
          fieldsData[field].type == "file"
        ) {
        } else {
          obj[fieldsData[field].name] = Yup.string();
        }
      }
    }

    return Yup.object().shape(obj);
  };

  const handlePostData = async (values) => {
    const transformedData = [];
    setLoading(true);

    for (const fieldName in values) {
      const field = fieldsData.find((f) => f.name === fieldName);

      if (field) {
        transformedData.push({
          field: field.id,
          answer_value:
            typeof values[fieldName] == "object"
              ? values[fieldName].join(", ")
              : values[fieldName],
        });
      }
    }

    let data = {
      answers: transformedData,
    };
    console.log(data, "data check");
    await fetch(`https://app.joshtalks.org/api/skill/v1/forms/${id}/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length > 2) {
          handleSubmitSuccess();

          setLoading(false);

          setSubmitted(true);
        }
      })
      .catch((err) => console.log(err, " checking res error coming from api"));
  };

  const handleSubmitClick = async () => {
    let data = {
      impression_id: allData.impression_id,
      form: id,
      field_id: null,
      event_name: "FORM_SUBMIT_CLICKED",
      ip_address: userIP.current ? userIP.current : Ipstate,
    };
    await fetch(" https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, " check line when form submit click"));
  };
  const handleSubmitSuccess = async () => {
    let data = {
      impression_id: allData.impression_id,
      form: id,
      field_id: null,
      event_name: "FORM_SUBMITTED",
      ip_address: userIP.current ? userIP.current : Ipstate,
    };
    await fetch(" https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) =>
        console.log(res, " check line when form is successfully submitted")
      );
  };
  return (
    <div className="my-3 max-w-2xl mx-auto">
      <Formik
        initialValues={
          Object.keys(initialValues).length > 0 ? initialValues : {}
        }
        validationSchema={validationNewSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            validateForm,
            dirty,
            setTouched,
            setErrors,
            isSubmitting,

            handleBlur,
            setValues,
          } = props;
          const handleChange = (event) => {
            const { name, value, type, checked } = event.target;
            let storedName;
            if (value) {
              if (name != previousName.current) {
                storedName = fieldsData.filter((item) => item.name == name);
                previousName.current = name;
              }

              if (storedName && storedName.length == 1 && Ipstate.length > 0) {
                handleFieldsFilled(storedName[0].id);
              }
            }

            if (type === "checkbox") {
              const checkboxValue = values[name] || [];

              setValues((prevValues) => ({
                ...prevValues,
                [name]: checked
                  ? [...checkboxValue, value]
                  : checkboxValue.filter((val) => val !== value),
              }));
            } else {
              setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
              }));
            }
            formFieldsRef.current[name] = value;

            setDataFilled({ ...values, [name]: value });
          };
          const newFunction = () => {
            alert("Hello");
          };
          const handleReset = async () => {
            setValues(initialValues);
            const isValid = await validateForm();

            for (let key in isValid) {
              let newerrors = errors;

              newerrors[key] = "";
            }
            console.log("after update", errors);
            const touchedFields = {};
            Object.keys(errors).forEach((fieldName) => {
              touchedFields[fieldName] = false;
            });
            setTouched(touchedFields);
            setChange(!change);
            const resetRadioButtons = document.querySelectorAll(
              'input[type="radio"]'
            );
            resetRadioButtons.forEach((radioButton) => {
              if (radioButton.checked) {
                radioButton.checked = false;
                radioButton.value = "";
              }
            });
            const resetCheckboxes = document.querySelectorAll(
              'input[type="checkbox"]'
            );
            resetCheckboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                checkbox.value = "";
              }
            });
            window.location.reload(false);
          };

          return (
            <div>
              <div>
                {fieldsData.map((item) =>
                  item.type !== "radio" &&
                  item.type !== "checkbox" &&
                  item.type !== "file" &&
                  item.type !== "location" ? (
                    <div key={item.id}>
                      <FIleType
                        item={item}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        trackInputFocus={trackInputFocus}
                        handleBlur={handleBlur}
                      />
                    </div>
                  ) : item.type == "radio" ? (
                    <div key={item.id}>
                      <RadioType
                        item={item}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        trackInputFocus={trackInputFocus}
                        handleBlur={handleBlur}
                      />
                    </div>
                  ) : item.type == "checkbox" ? (
                    <div key={item.id}>
                      <CheckBoxType
                        item={item}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        trackInputFocus={trackInputFocus}
                        handleBlur={handleBlur}
                      />
                    </div>
                  ) : (
                    item.type == "location" && ""
                  )
                )}

                <StatementType />

                <ButtonType
                  values={values}
                  setValues={setValues}
                  loading={loading}
                  handleSubmitClick={handleSubmitClick}
                  validateForm={validateForm}
                  errors={errors}
                  setTouched={setTouched}
                  handlePostData={handlePostData}
                  handleOpen={handleOpen}
                  open={open}
                  handleClose={handleClose}
                  style={style}
                  handleReset={handleReset}
                />
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default UPSCName;
