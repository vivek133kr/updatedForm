

import { Alert, Button, Modal } from "@mui/material";
import "../../../App.css";
import UploadLogo from "./uploadlogo.png";

import PDF from "./PDF icon.svg"
import Sheets from "./Xls icon.svg"
import IMAGE from "./Image icon.svg"
import Dropzone, { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";
import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useState,
  useContext,
} from "react";
import { Formik, Form } from "formik";

import "@fontsource/roboto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modals from "./Modals";



import { isMobile } from "react-device-detect";

const CSRF_TOKEN =
  "Ic2vJLgmmzOGz5LahoImdlHJ4AqBUWUfNsyJ0nRnne6Y19ZynmVC5iM3l0RP8aYU";

function Name({ fields, allData, setSubmitted }) {
 let [Ipstate, setIp] = useState("")
  let userIP = useRef("")
  let previousName = useRef("")
  const fetchUserIP = async () => {
    let newres;
    let res = await fetch("https://api64.ipify.org/?format=json")
      .then((res) => res.json())
      .then((res) => {
        newres = res;
        userIP.current = res.ip
        setIp(res.ip)
        setIpAddress6(res);
      });

    return newres;
  };

   

   const { id } = useParams();

 const [IdToken, setIdToken] = useState(
   localStorage.getItem(`formId${id}_token`)
 );
    const formFieldsRef = useRef({});
  let mailCheck = localStorage.getItem("mainEmail")


  
      useEffect(() => {
       
      

        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = "";

          const formData = {};
          Object.keys(formFieldsRef.current).forEach((fieldName) => {
            formData[fieldName] = formFieldsRef.current[fieldName];
          });
         
        
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);
  const formLoadCalled = useRef(false);

  useEffect(() => {

let res = fetchUserIP();

userIP.current = res.ip;
   

   
  }, []);
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
        Authorization: IdToken,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, " check line when form is loaded"));
    console.log("hello line 34");
  };

  useEffect(() =>{
    if (Ipstate.length > 0 && allData.login_required == false){
 if (!formLoadCalled.current) {
   handleFormLoad();
   formLoadCalled.current = true;
 }
    }
    
  }, [Ipstate])

      
   const handleFieldsFilled = async (fieldId) => {
  
     let data = {
       impression_id: allData.impression_id,
       form: id,
       field_id: fieldId,
       event_name: "FIELD_FILLED",
       ip_address: userIP.current ? userIP.current : Ipstate
     };
     await fetch("https://app.joshtalks.org/api/skill/v1/forms/impressions/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: IdToken,
       },
       body: JSON.stringify(data),
     })
       .then((res) => res.json())
       .then((res) => console.log(res, " check line when form is filled"));
   };
  const trackInputFocus = async (fieldName, value, type, InputId) => {
      
  
     let data = {
       impression_id: allData.impression_id,
       form: id,
       field_id: InputId,
       event_name: "FIELD_INTERACTED",
       ip_address: userIP.current ? userIP.current : Ipstate,
     };
        await fetch(
          " https://app.joshtalks.org/api/skill/v1/forms/impressions/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: IdToken,
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((res) =>
            console.log(res, " check line when form is interacted")
          );
 
       


  

  
  };


 
  const handleSubmitClick =  async ()=>{
  
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
         Authorization: IdToken,
       },
       body: JSON.stringify(data),
     })
       .then((res) => res.json())
       .then((res) => console.log(res, " check line when form submit click"));
 
  }


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
        Authorization: IdToken,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) =>
        console.log(res, " check line when form is successfully submitted")
      );
  };
  const trackInputBlur = (fieldName, value, type) => {
    

 
  
   
  };
const trackFieldInteraction = (fieldName) => {


   
 
 
};

const [lat, setLat] = useState("")
const [long, setLong] = useState("");

// Track if a field was left empty
const trackFieldEmpty = (fieldName) => {
 

 
};
  

  const [ipAddress6, setIpAddress6] = useState({})
  const [ipAddress4, setIpAddress4] = useState({})
   const [mobileInfo, setMobileInfo] = useState(null);

   const [networkType, setNetworkType] = useState("");
   const [effectiveType, setEffectiveType] = useState("");

   useEffect(() => {



   fetch("https://api.ipify.org/?format=json")
     .then((res) => res.json())
     .then((res) => setIpAddress4(res))
       const getMobileInfo = () => {
         const { userAgent, platform } = navigator;

         // Check if the user is on a mobile device
     

   
         // Get the device information
         const device = isMobile ? "Mobile Device" : "Desktop";

    
         // Extract mobile model from user agent
         const modelStartIndex = userAgent.indexOf("(") + 1;
         const modelEndIndex = userAgent.indexOf(")");
         const model = isMobile
           ? userAgent.substring(modelStartIndex, modelEndIndex)
           : "";

         // Extract operating system information from user agent
         const osStartIndex = userAgent.indexOf("(") + 1;
         const osEndIndex = userAgent.indexOf(")");
         const osInfo = isMobile
           ? userAgent.substring(osStartIndex, osEndIndex)
           : "";
         const [operatingSystem, operatingSystemVersion] = osInfo
           .split(";")
           .map((info) => info.trim());

         // Set the mobile information in state
         setMobileInfo({
           userAgent,
           platform,
           isMobile,
           device,
           model,
           operatingSystem,
           operatingSystemVersion:
             operatingSystemVersion == undefined ? "" : operatingSystemVersion,
         });
       };

       getMobileInfo();
      

    const handleNetworkChange = () => {
      let type = "unknown";
      let effectiveType = "";

      if (navigator.connection) {
        const connection = navigator.connection;

        if (connection.type) {
          type = connection.type;
        }

        if (connection.effectiveType) {
          effectiveType = connection.effectiveType;
        }
      } else if (navigator.onLine) {
        type = "online";
      } else {
        type = "offline";
      }

      setNetworkType(type);
      setEffectiveType(effectiveType);
    };

    handleNetworkChange();

    // Add an event listener to detect network changes if supported
    if (window.addEventListener) {
      window.addEventListener("online", handleNetworkChange);
      window.addEventListener("offline", handleNetworkChange);
    }

    // Cleanup the event listeners on component unmount
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener("online", handleNetworkChange);
        window.removeEventListener("offline", handleNetworkChange);
      }
    };

    
   }, []);


 
  let [locationDetails, setLocationDetails] = useState({});
  let [resendOtp, setResendOtp] = useState(false);
  let [storeOtp, setStoreOtp] = useState("");
  let btnData = useRef([]);
  function handleKeyDown(e) {
    // Disable up and down arrow keys and mouse wheel
    if (e.keyCode === 38 || e.keyCode === 40 || e.deltaY) {
      e.preventDefault();
    }
  }
  let [sizeError, setSizeError] = useState(0);
  let navigate = useNavigate();
  let [mobNumber, setMobNumber] = useState("");

  let [progress, setProgress] = useState(0);
  let [urlsData, setUrlsData] = useState([]);

  
  const [DropErrors, setDropErrors] = useState([]);
  let [maxFileError, setMaxFileError] = useState(0);
  
  let [inValidOTP, setInvalidOtp] = useState(false);
  let [otpResent, setOtpResent] = useState(true);
  const [openFileSection, setOpenFileSection] = useState(null);
 
  let [dataFilled, setDataFilled] = useState({});
  const [locationData, setLocationData] = useState("");

  const [locationLoading, setLocationLoading] = useState(false);

  const [widthTotal, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (allData.login_required) {
      const loginTime = localStorage.getItem("loginTime");
      const expirationTime = localStorage.getItem("expirationTime");
      const now = new Date().getTime();

      // If login time or expiration time is not set or 30 minutes have passed since the login time, remove the token and redirect to login
      if (!loginTime || now - loginTime >= 20 * 60 * 1000) {
        localStorage.removeItem("login");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("expirationTime");
        window.location.href = `/scholarship/upsc/finance-form/${id}/login`;
        return;
      }

      // Set the new expiration time for the token
      const newExpirationTime = now + 20 * 60 * 1000;
      localStorage.setItem("expirationTime", newExpirationTime);

      // Check the expiration time periodically and redirect to login if necessary
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const expirationTime = localStorage.getItem("expirationTime");

        if (!expirationTime || now > expirationTime) {
          localStorage.removeItem("login");
          localStorage.removeItem("loginTime");
          localStorage.removeItem("expirationTime");
          clearInterval(intervalId);
          window.location.href = `/scholarship/upsc/finance-form/${id}/login`;
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

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
  let [fileLoading, setFileLoading] = useState(false);
  let [fieldsData, setFieldsData] = useState([]);
  let [change, setChange] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mainProgress, setmainProgress] = useState(0);

  useEffect(() => {
    setmainProgress(progress);
  }, [progress]);

  let [loading, setLoading] = useState(false);
  let [initialValues, setInitialValues] = useState({});
  let [validationSchema, setValidationSchema] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  let refData = useRef([]);


  // const handleDropCloseModal = () => setDropShowModal(false);
  // const handleDropOpenModal = () => setDropShowModal(true);

  useEffect(() => {
    setFieldsData(getFieldsData());

    setValidationSchema(validationNewSchema()); // call validationNewSchema here
    getInitialValues(fields); // call getInitialValues here
    handleBtnData(fields);
  }, [fields, change]);
  useEffect(() => {
    handleBtnData(fieldsData);
  }, [fieldsData]);

  const handleBtnData = (fields) => {
    let obj = [];

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].type == "file") {
        let newobj = {
          id: fields[i].id,
          file: [],
        };
        obj.push(newobj);
      }
    }
    btnData.current = obj;
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

  const getInitialValues = (fieldsData) => {
    let fieldObject = {};
    refData.current = fieldsData;
    for (let field in fieldsData) {
      if (fieldObject[fieldsData[field].type] == "location") {
        fieldObject[fieldsData[field].name] = locationData ? locationData : "";
      } else if (
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
              /^[0-9]{10}$/,
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

  const handlePostData = async (values, setValues) => {
//  trackFieldInteraction(name);

//  // Track if the field was left empty
//  if (!value || (value && value.trim() === "")) {
//    trackFieldEmpty(name);
//  }
 if (!allData.login_required) {

   const missingFields = fieldsData.filter(
     (field) => !Object.keys(values).includes(field.name)
   );
 


   for (let key in values) {
     trackFieldInteraction(key);
   }
   if (missingFields.length > 0) {
     for (let i = 0; i < missingFields.length; i++) {
       trackFieldEmpty(missingFields[i].name);
     }
   }
 }
 
    const transformedData = [];
    setLoading(true);

    for (const fieldName in values) {
      const field = fieldsData.find((f) => f.name === fieldName);

      if (field.type == "file") {
        let arr = [];

        let mainData = [];
        let output = [];

        // Iterate over fileupload array
        for (let file of values[field.name]) {
          // Search for corresponding URL in urlsData array
          for (let data of urlsData) {
            if (data.id == field.id) {
              for (let obj of data.data) {
                if (obj.file.name === file.name) {
                  output.push(obj.url);
                  break;
                }
              }
            }
          }
        }

        transformedData.push({
          field: field.id,
          answer_value: output.join(","),
        });
      } else if (field.type !== "file") {
        transformedData.push({
          field: field.id,
          answer_value:
            typeof values[fieldName] == "object"
              ? values[fieldName].join(", ")
              : values[fieldName],
        });
      }
    }

    let storeMob;
    for (let j = 0; j < fieldsData.length; j++) {
      if (fieldsData[j].type == "tel" && fieldsData[j].name == "mobileno") {
        storeMob = dataFilled[fieldsData[j].name];
      }
    }

    let updatedData = transformedData.sort((a, b) => {
      return a.field - b.field;
    });

    let data;
    if (allData.otp_required == true ) {
      data = {
        answers: updatedData,
        otp: storeOtp,
        mobile: storeMob,
        email: mailCheck,
        location: allData.location_required ? locationDetails : {},
        network: {
          ipv6: ipAddress6.ip,
          ipv4: ipAddress4.ip,
          networkType,
          effectiveType,
        },
        device: {
          platform: mobileInfo.platform,
          isMobile: mobileInfo.isMobile,
          device: mobileInfo.device,
          model: mobileInfo.model,
          operatingSystem: mobileInfo.operatingSystem,
          operatingSystemVersion: mobileInfo.operatingSystemVersion
        },
      };
    } else {
      data = {
        answers: updatedData,
        otp: "",
        mobile: "",
        email: "",
        location: allData.location_required ? locationDetails : {},
        network: {
          ipv6: ipAddress6.ip,
          ipv4: ipAddress4.ip,
          networkType,
          effectiveType,
        },
        device: {
          platform: mobileInfo.platform,
          isMobile: mobileInfo.isMobile,
          device: mobileInfo.device,
          model: mobileInfo.model,
          operatingSystem: mobileInfo.operatingSystem,
          operatingSystemVersion: mobileInfo.operatingSystemVersion,
        },
      };
    }

    let dataFormat;

    if (allData.otp_required == true) {
      dataFormat = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: IdToken,
        },
        body: JSON.stringify(data),
      };
    } else {
      dataFormat = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ``,
        },
        body: JSON.stringify(data),
      };
    }

    await fetch(
      ` https://app.joshtalks.org/api/skill/v1/forms/${id}/submit/`,
      dataFormat
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error === "OTP is not valid") {
         

          setOtpResent(true);
          setInvalidOtp(true);
          setLoading(false);

          setStoreOtp("");
        } else if (Object.keys(res).length > 2) {
          if (allData.login_required == false){
   handleSubmitSuccess();
          }
       
       
          setInvalidOtp(false);
          setOtpResent(false);
          setLoading(false);
          handleCloseModal();
          setSubmitted(true);
        } else {
        

          localStorage.removeItem(`formId${id}_token`);
          localStorage.removeItem("login");
          navigate(`/scholarship/upsc/finance-form/${id}/login`);
        }
      })
      .catch((err) => {
        console.log(err, " line 332 error");
      });
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
            if (value){
             
              if (name != previousName.current){
                   
storedName = fieldsData.filter((item) => item.name == name);
previousName.current = name
              }

              if (
                storedName &&
                storedName.length == 1 &&
                Ipstate.length > 0 &&
                allData.login_required == false
              ) {
              
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
          
          function success(pos) {
           
            var crd = pos.coords;

            setLat(crd.latitude)
            setLong(crd.longitude)
            //  for (let i = 0; i < fieldsData.length; i++) {
            //    if (fieldsData[i].type == "location") {
            //      setValues((prevValues) => ({
            //        ...prevValues,
            //        [fieldsData[i]
            //          .name]: `lat=${crd.latitude}-long=${crd.longitude}`,
            //      }));
            //    }
            //  }
            //  setLocationData(`lat=${crd.latitude}-long=${crd.longitude}`);
            
            const apiKey = "47873f180d4241b1a2276aa6c204c342";
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=${apiKey}`;
             window.fetch(url).then((response) => response.json())
              .then((response) => {
             
                   
                const {city, state, postcode, country, neighbourhood, road, suburb } =
                  response.results[0].components;
                const { formatted } = response.results[0];

                let datastr = `${city == undefined ?state:city}, ${postcode}, ${country}`;
                let locationInDetails = {
                  location: city == undefined ?state:city,
                  lat: crd.latitude,
                  long: crd.longitude,
                  full_address: formatted,
                  short_address: `${city == undefined ?state:city}, ${postcode}, ${country}`,
                };
              
                setLocationDetails(locationInDetails);
                (city == undefined ?state:city) && postcode && setLocationData(datastr);
                for (let i = 0; i < fieldsData.length; i++) {
                  if (fieldsData[i].type == "location") {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [fieldsData[i].name]: datastr,
                    }));
                       setLocationLoading(false);
                    break;
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          function errorHandler(error) {
     
    // Geolocation API is not supported or not available
    // Provide a manual location input mechanism
    setLocationData("Error Fetching Location");
    for (let i = 0; i < fieldsData.length; i++) {
      if (fieldsData[i].type === "location") {
        setValues((prevValues) => ({
          ...prevValues,
          [fieldsData[i].name]: "Error Fetching Location",
        }));
        setLocationLoading(false);
        break;
      }
    }
          }

         const askLocationPermission = (e) => {
           setLocationLoading(true);
           let newarr = fieldsData;
if (navigator.permissions) {
  navigator.permissions
    .query({ name: "geolocation" })
    .then(function (permissionStatus) {
      if (permissionStatus.state === "granted") {
        navigator.geolocation.getCurrentPosition(success, errorHandler);
      } else if (permissionStatus.state === "prompt") {
        navigator.geolocation.getCurrentPosition(success, errorHandler);
      } else if (permissionStatus.state === "denied") {
        setLocationData("Error Fetching Location");
        for (let i = 0; i < fieldsData.length; i++) {
          if (fieldsData[i].type === "location") {
            setValues((prevValues) => ({
              ...prevValues,
              [fieldsData[i].name]: "Error Fetching Location",
            }));
            setLocationLoading(false);
            break;
          }
        }
      }
    });
} else if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, errorHandler);
} else {
           setLocationData("Error Fetching Location");
           for (let i = 0; i < fieldsData.length; i++) {
             if (fieldsData[i].type === "location") {
               setValues((prevValues) => ({
                 ...prevValues,
                 [fieldsData[i].name]: "Error Fetching Location",
               }));
               setLocationLoading(false);
               break;
             }
           }
           }
}
        


          const handleReset = async () => {
            setValues(initialValues);
            const isValid = await validateForm();

            for (let key in isValid) {
              let newerrors = errors;

              newerrors[key] = "";
            }

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
                        <span className="text-red-600">
                          {item.required ? " * " : ""}
                        </span>
                      </label>
                      <input
                        id={item.name}
                        name={item.name}
                        placeholder="Your answer"
                        type={item.type === "tel" ? "number" : item.type}
                        inputMode={item.type === "tel" ? "numeric" : undefined}
                        digits={item.type === "tel" ? "10" : undefined}
                        value={values[item.name]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => {
                          if (allData.login_required == false) {
                            trackInputFocus(
                              item.name,
                              e.target.value,
                              item.type,
                              item.id
                            );
                          }
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          trackInputBlur(item.name, e.target.value, item.type);
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
                          <span
                            style={{ marginLeft: "1%" }}
                            className="errorStyle"
                          >
                            {errors[item.name]}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : item.type == "radio" ? (
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
                        <span className="text-red-600">
                          {item.required ? " * " : ""}
                        </span>
                      </label>
                      <div>
                        {item.options.map((option, i) => (
                          <div className="divRadio mt-4" key={i}>
                            <input
                              style={{ width: "20px", height: "20px" }}
                              type="radio"
                              id={`${item.name}-${i}`}
                              onChange={handleChange}
                              onFocus={(e) => {
                                if (allData.login_required == false) {
                                  trackInputFocus(
                                    item.name,
                                    e.target.value,
                                    item.type,
                                    item.id
                                  );
                                }
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                trackInputBlur(
                                  item.name,
                                  e.target.value,
                                  item.type
                                );
                              }}
                              name={item.name}
                              value={option.value}
                            />

                            <div style={{ marginLeft: "2%" }}>
                              <label
                                htmlFor={`${item.name}-${i}`}
                                style={{ cursor: "pointer" }}
                                className="label"
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
                          <span
                            style={{ marginLeft: "1%" }}
                            className="errorStyle"
                          >
                            {errors[item.name]}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : item.type == "checkbox" ? (
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
                        <span className="text-red-600">
                          {item.required ? " * " : ""}
                        </span>
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
                                if (allData.login_required == false) {
                                  trackInputFocus(
                                    item.name,
                                    e.target.value,
                                    item.type,
                                    item.id
                                  );
                                }
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                trackInputBlur(
                                  item.name,
                                  e.target.value,
                                  item.type
                                );
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
                          <span
                            style={{ marginLeft: "1%" }}
                            className="errorStyle"
                          >
                            {errors[item.name]}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : item.type == "location" ? (
                    <div
                      key={item.id}
                      style={{ borderRadius: "8px" }}
                      className={`bg-white p-5 mt-3 ${
                        errors[item.name] && touched[item.name]
                          ? "border border-red-500"
                          : "border border"
                      }`}
                    >
                      <label
                        htmlFor={item.name}
                        style={{ display: "block" }}
                        className="font-normal font-medium text-base leading-6 inputLabel"
                      >
                        Current Location
                        <span className="text-red-600">
                          {true ? " * " : ""}
                        </span>
                      </label>
                      {locationData.length == 0 ? (
                        <div className="mt-6">
                          {locationLoading == false ? (
                            <Button
                              name={item.name}
                              variant="contained"
                              value={""}
                              onClick={() => {
                                askLocationPermission();
                              }}
                              style={{
                                display: "flex",
                                backgroundColor: "white",
                                color: "blue",
                                height: "37px",
                              }}
                            >
                              <LocationOnIcon />
                              <p>Add Location</p>
                            </Button>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                width: "fit-content",
                                alignItems: "center",
                              }}
                              className="mt-5"
                            >
                              <LocationOnIcon />
                              <CircularProgress
                                size="3vh"
                                style={{ marginLeft: "20px" }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        locationLoading != true &&
                        values[item.name] && (
                          <div
                            style={{ display: "flex", width: "100%" }}
                            className="mt-5"
                          >
                            <LocationOnIcon />
                            <input
                              style={{
                                backgroundColor: "white",
                                width: "100%",
                                overflow: "scroll",
                              }}
                              name={item.name}
                              value={
                                values[item.name]
                                  ? values[item.name]
                                  : "Location Recorded"
                              }
                              disabled
                            />
                          </div>
                        )
                      )}
                      {errors[item.name] && touched[item.name] && (
                        <div className="input-feedback flex text-red-600  items-center mt-3">
                          <span>
                            <ErrorOutlineIcon />
                          </span>
                          <span
                            style={{ marginLeft: "1%" }}
                            className="errorStyle"
                          >
                            {errors[item.name]}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    item.type == "file" && (
                      <div
                        key={item.id}
                        style={{ borderRadius: "8px" }}
                        className={`bg-white p-5 mt-3 ${
                          errors[item.name] && touched[item.name]
                            ? "border border-red-500"
                            : "border border"
                        }`}
                      >
                        <label
                          htmlFor={item.name}
                          style={{ display: "block" }}
                          className="font-normal font-medium text-base leading-6 inputLabel"
                        >
                          {item.label}
                          <span className="text-red-600">
                            {item.required ? " * " : ""}
                          </span>
                        </label>

                        {values[item.name] == undefined ||
                        values[item.name].length < item.max_file_allowed ? (
                          <Button
                            name={item.name}
                            variant="contained"
                            onClick={() => {
                              setDropErrors([]);
                              setMaxFileError(0);
                              setSizeError(0);
                              setOpenFileSection(item.id);
                            }}
                            value={""}
                            style={{
                              display: "flex",
                              backgroundColor: "white",
                              color: "blue",
                              marginTop: "3%",
                              height: "37px",
                            }}
                          >
                            <FileUploadIcon />
                            <p>Add File</p>
                          </Button>
                        ) : (
                          values[item.name].length == item.max_file_allowed &&
                          ""
                        )}
                        {item.id === openFileSection && (
                          <div
                            className="dropzone-container"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0,0,0,0.5)",
                              zIndex: 9999,
                            }}
                            onClick={(event) => {
                              if (
                                event.target.className === "dropzone-container"
                              ) {
                                setOpenFileSection(null);
                              }
                            }}
                          >
                            <Dropzone
                              key={item.id}
                              maxFiles={item.max_file_allowed}
                              accept={item.document_types
                                .split(",")
                                .reduce((accept, ext) => {
                                  switch (ext.trim()) {
                                    case ".jpeg":
                                    case ".jpg":
                                    case ".jpe":
                                      accept["image/jpeg"] = (
                                        accept["image/jpeg"] || []
                                      ).concat(ext);
                                      break;
                                    case ".png":
                                      accept["image/png"] = (
                                        accept["image/png"] || []
                                      ).concat(ext);
                                      break;
                                    case ".xls":
                                    case ".xlt":
                                    case ".xlm":
                                    case ".xlsx":
                                    case ".xlsm":
                                    case ".xltx":
                                    case ".xltm":
                                    case ".xlsb":
                                    case ".xlam":
                                      accept["application/vnd.ms-excel"] = (
                                        accept["application/vnd.ms-excel"] || []
                                      ).concat(ext);
                                      break;
                                    case ".csv":
                                      accept["text/csv"] = (
                                        accept["text/csv"] || []
                                      ).concat(ext);
                                      break;
                                    case ".doc":
                                    case ".dot":
                                    case ".docx":
                                    case ".docm":
                                    case ".dotx":
                                    case ".dotm":
                                      accept["application/msword"] = (
                                        accept["application/msword"] || []
                                      ).concat(ext);
                                      break;
                                    case ".pdf":
                                      accept["application/pdf"] = (
                                        accept["application/pdf"] || []
                                      ).concat(ext);
                                      break;
                                    case ".txt":
                                      accept["text/plain"] = (
                                        accept["text/plain"] || []
                                      ).concat(ext);
                                      break;
                                    default:
                                      break;
                                  }
                                  return accept;
                                }, {})}
                              maxSize={Number(item.max_file_size) * 1024 * 1024}
                              onDrop={(acceptedFiles, rejectedFiles) => {
                                if (rejectedFiles.length > 0) {
                                  let kt = 0;
                                  for (
                                    let i = 0;
                                    i < rejectedFiles.length;
                                    i++
                                  ) {
                                    for (
                                      let k = 0;
                                      k < rejectedFiles[i].errors.length;
                                      k++
                                    ) {
                                      let save =
                                        rejectedFiles[i].errors[k].code;
                                      if (save == "file-too-large") {
                                        kt++;
                                      }
                                    }
                                  }
                                  if (kt > 0) {
                                    setSizeError(kt);
                                    return;
                                  }
                                }

                                let newVal = acceptedFiles.map((file) => ({
                                  file,
                                  name: file.name,
                                  progress: 0,
                                  loading: false,
                                  url: "",
                                }));
                                if (
                                  values[item.name] &&
                                  values[item.name].length > 0
                                ) {
                                  newVal = newVal.filter((newFile) => {
                                    return !values[item.name].some(
                                      (existingFile) => {
                                        return (
                                          newFile.name === existingFile.name
                                        );
                                      }
                                    );
                                  });
                                }
                                if (
                                  rejectedFiles.length > item.max_file_allowed
                                ) {
                                  setMaxFileError(item.max_file_allowed);
                                }
                                if (
                                  newVal.length > item.max_file_allowed ||
                                  (values[item.name] &&
                                    newVal.length + values[item.name].length >
                                      item.max_file_allowed)
                                ) {
                                  setMaxFileError(item.max_file_allowed);
                                  return;
                                }
                                if (
                                  rejectedFiles.length > 0 ||
                                  newVal.length == 0 ||
                                  (values[item.name] &&
                                    newVal.length + values[item.name].length >
                                      item.max_file_allowed)
                                ) {
                                  if (
                                    values[item.name] &&
                                    newVal.length + values[item.name].length >
                                      item.max_file_allowed
                                  ) {
                                    setMaxFileError(item.max_file_allowed);
                                    return;
                                  }
                                  return;
                                }
                                if (rejectedFiles.length > 0) {
                                  return;
                                }
                                if (
                                  values[item.name] &&
                                  values[item.name].length ==
                                    item.max_file_allowed
                                ) {
                                } else if (
                                  values[item.name] == undefined ||
                                  values[item.name].length + newVal.length <=
                                    item.max_file_allowed
                                ) {
                                  setValues((prevValues) => ({
                                    ...prevValues,
                                    [item.name]: prevValues[item.name]
                                      ? [...prevValues[item.name], ...newVal]
                                      : newVal,
                                  }));
                                  let kval = btnData.current;

                                  for (let i = 0; i < kval.length; i++) {
                                    if (kval[i].id == item.id) {
                                      if (kval[i].file.length > 0) {
                                        kval[i].file.push(...newVal);
                                      } else {
                                        kval[i].file.push(...newVal);
                                      }
                                    }
                                  }
                                  btnData.current = kval;
                                }

                                const acceptedTypes = [];

                                item.document_types
                                  .split(",")
                                  .forEach(function (fileType) {
                                    if (
                                      fileType === ".jpeg" ||
                                      fileType === ".jpg"
                                    ) {
                                      acceptedTypes.push("image/jpeg");
                                    } else if (fileType === ".png") {
                                      acceptedTypes.push("image/png");
                                    } else if (
                                      fileType === ".xls" ||
                                      fileType === ".xlsm" ||
                                      fileType === ".xlsx"
                                    ) {
                                      acceptedTypes.push(
                                        "application/vnd.ms-excel"
                                      );
                                    } else if (fileType === ".csv") {
                                      acceptedTypes.push("text/csv");
                                    } else if (
                                      fileType === ".doc" ||
                                      fileType === ".docx"
                                    ) {
                                      acceptedTypes.push("application/msword");
                                    } else if (fileType === ".pdf") {
                                      acceptedTypes.push("application/pdf");
                                    } else if (fileType === ".txt") {
                                      acceptedTypes.push("text/plain");
                                    }
                                  });

                                const invalidFiles = acceptedFiles.filter(
                                  (file) => !acceptedTypes.includes(file.type)
                                );
                                const validFiles = acceptedFiles.filter(
                                  (file) => acceptedTypes.includes(file.type)
                                );
                                if (invalidFiles.length > 0) {
                                  alert(
                                    `Invalid file type(s) detected. Only ${acceptedTypes.join(
                                      ", "
                                    )} files are accepted.`
                                  );
                                }

                                if (
                                  rejectedFiles.length == 0 &&
                                  validFiles.length > 0
                                ) {
                                  newVal.map(async (newItem) => {
                                    setProgress(0);

                                    const formData = new FormData();
                                    formData.append("file", newItem.file);

                                    const xhr = new XMLHttpRequest();
                                    xhr.open(
                                      "POST",
                                      ` https://app.joshtalks.org/api/skill/v1/forms/upload/${item.id}/`
                                    );
                                    xhr.withCredentials = true;
                                    xhr.setRequestHeader(
                                      "Authorization",
                                      IdToken
                                    );
                                    xhr.setRequestHeader(
                                      "X-CSRFToken",
                                      CSRF_TOKEN
                                    );

                                    xhr.upload.addEventListener(
                                      "progress",
                                      (event) => {
                                        if (event.lengthComputable) {
                                          const percentCompleted = Math.round(
                                            (event.loaded * 100) / event.total
                                          );
                                          setProgress(percentCompleted);
                                          let newData = btnData.current;

                                          let newVal;
                                          for (
                                            let i = 0;
                                            i < newData.length;
                                            i++
                                          ) {
                                            if (newData[i].id == item.id) {
                                              let j = newData[i];
                                              let newVal = j.file.filter(
                                                (copy) =>
                                                  copy.name == newItem.name
                                              );

                                              if (percentCompleted <= 100) {
                                                newVal[0].progress =
                                                  percentCompleted;
                                              }
                                            }
                                          }

                                          //  setValues((prevFiles) =>
                                          //    prevFiles.map((f) =>
                                          //      f.name === file.name
                                          //        ? {
                                          //            ...f,
                                          //            progress: percentCompleted,
                                          //          }
                                          //        : f
                                          //    )
                                          //  );
                                        }
                                      }
                                    );

                                    xhr.addEventListener("load", (event) => {
                                      setFileLoading(true);
                                      if (event.target.status === 201) {
                                        const res = JSON.parse(xhr.response);

                                        let k = urlsData;

                                        if (k.length == 0) {
                                          k.push({
                                            id: item.id,
                                            data: [
                                              {
                                                file: newItem,
                                                url: res.url,
                                              },
                                            ],
                                          });
                                        } else {
                                          let find = false;
                                          for (let i = 0; i < k.length; i++) {
                                            if (item.id == k[i].id) {
                                              find = true;
                                              k[i].data.push({
                                                file: newItem,
                                                url: res.url,
                                              });
                                            }
                                          }
                                          if (find == false) {
                                            k.push({
                                              id: item.id,
                                              data: [
                                                {
                                                  file: newItem,
                                                  url: res.url,
                                                },
                                              ],
                                            });
                                          }
                                        }

                                        setUrlsData(k);
                                        setFileLoading(false);
                                      }
                                      if (event.target.status == 403) {
                                        let newData = btnData.current;

                                        let newVal;
                                        for (
                                          let i = 0;
                                          i < newData.length;
                                          i++
                                        ) {
                                          if (newData[i].id == item.id) {
                                            let j = newData[i];
                                            let newVal = j.file.filter(
                                              (copy) =>
                                                copy.name == newItem.name
                                            );

                                            newVal[0].progress = -1;
                                          }
                                        }
                                        localStorage.removeItem(
                                          `formId${id}_token`
                                        );
                                        localStorage.removeItem("login");
                                        navigate(
                                          `/scholarship/upsc/finance-form/${id}/login`
                                        );
                                      }
                                    });

                                    //  xhr.addEventListener("error", (error) => {
                                    //    console.error(error);
                                    //    setFiles((prevFiles) =>
                                    //      prevFiles.map((f) =>
                                    //        f.name === file.name
                                    //          ? { ...f, progress: -1 }
                                    //          : f
                                    //      )
                                    //    );
                                    //  });

                                    xhr.send(formData);
                                    setOpenFileSection(null);
                                    // const formData = new FormData();
                                    // formData.append("file", newItem);

                                    // await
                                    //  fetch
                                    //  (
                                    //   `http://staging.joshtalks.org:9002/api/skill/v1/forms/upload/${item.id}/`,
                                    //   {
                                    //     method: "POST",
                                    //     headers: {
                                    //       Authorization: IdToken,
                                    //       Cookie:
                                    //         "csrftoken=Ic2vJLgmmzOGz5LahoImdlHJ4AqBUWUfNsyJ0nRnne6Y19ZynmVC5iM3l0RP8aYU",
                                    //     },
                                    //     body: formData,
                                    //   }
                                    // )
                                    //   .then((res) => res.json())
                                    //   .then((res) => {
                                    //     console.log(
                                    //       res,
                                    //       " checking over here",
                                    //       urlsData
                                    //     );
                                    //     let k = urlsData;

                                    //     if (k.length == 0) {
                                    //       k.push({
                                    //         id: item.id,
                                    //         data: [
                                    //           {
                                    //             file: newItem,
                                    //             url: res.url,
                                    //           },
                                    //         ],
                                    //       });
                                    //     } else {
                                    //       let find = false;
                                    //       for (let i = 0; i < k.length; i++) {
                                    //         if (item.id == k[i].id) {
                                    //           find = true;
                                    //           k[i].data.push({
                                    //             file: newItem,
                                    //             url: res.url,
                                    //           });
                                    //         }
                                    //       }
                                    //       if (find == false) {
                                    //         k.push({
                                    //           id: item.id,
                                    //           data: [
                                    //             {
                                    //               file: newItem,
                                    //               url: res.url,
                                    //             },
                                    //           ],
                                    //         });
                                    //       }
                                    //     }

                                    //     setUrlsData(k);
                                    //   })
                                    //   .catch((error) => console.log(error));
                                  });
                                }

                                // console.log(urlsData, "line 955");

                                // if (
                                //   rejectedFiles.length == 0 &&
                                //   DropErrorTrack == false
                                // ) {
                                //   setOpenFileSection(null);
                                // } else {
                                // }
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  style={{
                                    width: widthTotal > 800 ? "40%" : "90%",
                                    height: "423px",

                                    borderRadius: "8px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    padding: "0px",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      paddingTop: "5%",
                                      paddingBottom: "5%",
                                      textAlign: "center",
                                      display: "flex",

                                      width: "100%",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "28px",
                                        color: "#1A73E8",
                                        fontFamily: "Roboto",
                                        paddingLeft: "4%",
                                        paddingRight: "4%",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Upload Files
                                    </p>
                                    <p
                                      style={{
                                        width: "90%",
                                      }}
                                    >
                                      Please make sure that the picture or PDF
                                      is clear
                                    </p>{" "}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "70%",

                                      flexDirection: "column",
                                      marginBottom: "5%",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      {...getRootProps({
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        margin: "30px",
                                        width: "300px",

                                        border: "2px solid purple",

                                        borderWidth: 2,
                                        borderRadius: 2,
                                        borderColor: "#eeeeee",
                                        borderStyle: "dashed",
                                        backgroundColor: "#fafafa",
                                        color: "#bdbdbd",
                                        transition: "border .3s ease-in-out",
                                      })}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <input
                                        {...getInputProps({
                                          maxFiles: item.max_file_allowed,
                                          accept: item.document_types
                                            .split(",")
                                            .map((ext) => {
                                              switch (ext) {
                                                case ".jpeg":
                                                case ".jpg":
                                                  return "image/jpeg";
                                                case ".png":
                                                  return "image/png";
                                                case ".xls":
                                                case ".xlsm":
                                                case ".xlsx":
                                                  return "application/vnd.ms-excel";
                                                case ".csv":
                                                  return "text/csv";
                                                case ".doc":
                                                case ".docx":
                                                  return "application/msword";
                                                case ".pdf":
                                                  return "application/pdf";
                                                case ".txt":
                                                  return "text/plain";
                                                default:
                                                  return "";
                                              }
                                            })
                                            .filter((type) => type !== "") // remove any empty types
                                            .join(", "),

                                          // limit to 5MB
                                        })}
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: "230px",

                                          borderWidth: 2,
                                          borderRadius: 9,
                                          borderColor: "#1A73E8",
                                          borderStyle: "dashed",
                                          backgroundColor: "#fafafa",
                                          border: "4px dashed #1A73E8",
                                          color: "#bdbdbd",
                                          transition: "border .3s ease-in-out",

                                          width: "100%",
                                        }}
                                      >
                                        <img src={UploadLogo} alt="new" />
                                        <p>Drag and drop file here</p>
                                        <p>OR</p>
                                        <Button variant="contained">
                                          Browse Files
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  {/* {values[item.name].length == item.max_file_allowed ? (
                                    <Alert
                                      icon={false}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "0 auto",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                    >
                                      <p>
                                        {" "}
                                        {DropErrors.length}
                                        {DropErrors.length == 1
                                          ? " file"
                                          : " files"}{" "}
                                        have been rejected. Make sure all files
                                        size should be within{" "}
                                        {item.max_file_size} mb
                                      </p>
                                    </Alert>
                                        ):""} */}

                                  {DropErrors && DropErrors.length > 0 ? (
                                    <Alert
                                      icon={false}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "0 auto",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                    >
                                      <p>
                                        {" "}
                                        {DropErrors.length}
                                        {DropErrors.length == 1
                                          ? " file"
                                          : " files"}{" "}
                                        have been rejected. Make sure all files
                                        size should be within{" "}
                                        {item.max_file_size} mb. Select Again
                                      </p>
                                    </Alert>
                                  ) : (
                                    ""
                                  )}
                                  {maxFileError && maxFileError > 0 ? (
                                    <Alert
                                      icon={false}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "0 auto",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                    >
                                      <p>
                                        Try again with fewer items. Upload of
                                        upto {maxFileError} files is allowed.
                                        <span>
                                          {" "}
                                          <Button
                                            style={{
                                              color: "#F3F800",
                                              border: "none",
                                              background: "transparent",
                                            }}
                                            variant="outlined"
                                            onClick={() => setMaxFileError(0)}
                                          >
                                            Dismiss
                                          </Button>
                                        </span>
                                      </p>
                                    </Alert>
                                  ) : (
                                    ""
                                  )}
                                  {sizeError && sizeError > 0 ? (
                                    <Alert
                                      icon={false}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "0 auto",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                    >
                                      <p>
                                        {sizeError}{" "}
                                        {sizeError > 1 ? "of files" : "file"}{" "}
                                        exceeded maximum file size limit of{" "}
                                        {item.max_file_size}mb
                                        <span>
                                          {" "}
                                          <Button
                                            style={{
                                              color: "#F3F800",
                                              border: "none",
                                              background: "transparent",
                                            }}
                                            variant="outlined"
                                            onClick={() => setSizeError(0)}
                                          >
                                            Dismiss
                                          </Button>
                                        </span>
                                      </p>
                                    </Alert>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </Dropzone>
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "3%",
                          }}
                        >
                          {values[item.name] && item.max_file_allowed >= 1
                            ? btnData.current
                                .filter((obj) => obj.id === item.id)
                                .map((ite, i) =>
                                  ite.file.map((items, j) => {
                                    return (
                                      <div
                                        key={j}
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          // alignItems: "center",

                                          // marginTop: "10px",
                                          // paddingTop: "10px",
                                          // paddingBottom: "10px",

                                          // paddingRight: "10px",
                                          // height: "40px",
                                          // paddingLeft: "10px",
                                          // marginRight: "10px",
                                          // marginBottom: "10px",
                                          // borderRadius: "4px",
                                          // border: "0.5px solid black",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",

                                            marginTop: "10px",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",

                                            paddingRight: "10px",
                                            height: "40px",
                                            paddingLeft: "10px",
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            borderRadius: "4px",
                                            border: "0.5px solid black",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              marginRight: "30px",
                                            }}
                                          >
                                            {" "}
                                            <img
                                              style={{
                                                width: "24px",
                                                height: "24px",
                                                marginRight: "10px",
                                              }}
                                              src={
                                                items.name.includes(".jpeg") ||
                                                items.name.includes(".jpg") ||
                                                items.name.includes(".png")
                                                  ? IMAGE
                                                  : items.name.includes(".pdf")
                                                  ? PDF
                                                  : Sheets
                                              }
                                              alt="i"
                                            />
                                            <p
                                              style={{
                                                flex: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                              }}
                                            >
                                              {" "}
                                              {items.name.length > 10
                                                ? items.name
                                                    .split(".")
                                                    .slice(0, -1)
                                                    .join(".")
                                                    .slice(0, 10)
                                                : items.name.split(".")[0]}
                                            </p>
                                          </div>

                                          {items.progress == 100 ||
                                          items.progress == -1 ? (
                                            <div
                                              style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",

                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                let newvalues =
                                                  values[item.name];

                                                let newData = btnData.current;

                                                for (
                                                  let i = 0;
                                                  i < newData.length;
                                                  i++
                                                ) {
                                                  if (
                                                    newData[i].id == item.id
                                                  ) {
                                                    let j = newData[i];
                                                    let newval = j.file.filter(
                                                      (copy) =>
                                                        copy.name != items.name
                                                    );
                                                    j.file = newval;
                                                  }
                                                }

                                                let k = newvalues.filter(
                                                  (itemnew) =>
                                                    itemnew.name !== items.name
                                                );
                                                setValues((prevValues) => ({
                                                  ...prevValues,
                                                  [item.name]: k,
                                                }));
                                              }}
                                            >
                                              X
                                            </div>
                                          ) : (
                                            <CircularProgress
                                              variant="determinate"
                                              value={items.progress}
                                              size="3vh"
                                            />
                                          )}
                                        </div>
                                        {items.progress === -1 && (
                                          <p style={{ color: "red" }}>
                                            Failed to upload!
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })
                                )
                            : ""}
                        </div>
                        {errors[item.name] && touched[item.name] && (
                          <div className="input-feedback flex text-red-600  items-center mt-3">
                            <span>
                              <ErrorOutlineIcon />
                            </span>
                            <span
                              style={{ marginLeft: "1%" }}
                              className="errorStyle"
                            >
                              {errors[item.name]}
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  )
                )}

                <div
                  style={{
                    marginTop: "3%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                  >
                    {" "}
                    By clicking 'Submit,' you acknowledge that you have read,
                    understood, and agree to the &nbsp;
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      <a
                        href="https://app.joshtalks.org/privacy-policy/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        Privacy Policy
                      </a>
                    </span>
                    &nbsp; and&nbsp;
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      <a
                        href="https://app.joshtalks.org/terms-conditions/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        Terms & Conditions{" "}
                      </a>
                    </span>{" "}
                    &nbsp;of Josh Talks. Additionally, I authorize Josh Talks
                    and its representatives to contact me with updates and
                    notifications via Email, SMS, WhatsApp, and Call. I
                    understand that this consent will override the registry on
                    DND and NDNC.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",

                    paddingLeft: "0px",
                    paddingRight: "0px",
                  }}
                  className={` p-5 mt--1 `}
                >
                  {allData.otp_required == false && loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      style={{
                        textTransform: "none",
                        backgroundColor: "#E33900",
                      }}
                      variant="contained"
                      onClick={async () => {
                        if (allData.login_required == false) {
                          handleSubmitClick();
                        }

                        const isValid = await validateForm();

                        if (Object.keys(isValid).length > 0) {
                          const err = Object.keys(isValid);

                          if (err.length) {
                            const input = document.querySelector(
                              `label[for=${`${err[0]}`}]`
                            );

                            input.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "start",
                            });
                          }
                          for (let key in isValid) {
                            let newerrors = errors;

                            newerrors[key] = isValid[key];
                          }

                          const touchedFields = {};
                          Object.keys(errors).forEach((fieldName) => {
                            touchedFields[fieldName] = true;
                          });
                          setTouched(touchedFields);
                        } else {
                          // const filledFields = fieldsData.filter((field) =>
                          //   Object.keys(values).includes(field.name)
                          // );

                          // if (filledFields.length > 0) {
                          //   for (let k = 0; k < filledFields.length; k++) {
                          //     handleFieldsFilled(filledFields[k].id);
                          //   }
                          // }
                          if (allData.otp_required == true) {
                            let num;
                            for (let i = 0; i < fieldsData.length; i++) {
                              if (
                                fieldsData[i].type == "tel" &&
                                fieldsData[i].name == "mobileno"
                              ) {
                                num = dataFilled[fieldsData[i].name];
                              }
                            }

                            if (!num) {
                              alert("Number not present");
                            } else {
                              fetch(
                                ` https://app.joshtalks.org/api/skill/v1/forms/otp/${num}/`,
                                {
                                  headers: {
                                    Authorization: IdToken,
                                  },
                                }
                              )
                                .then((res) => res.json())
                                .then((res) => {
                                  if (res.message == "opt sent to number") {
                                    setMobNumber(num);
                                    handleOpenModal();
                                  } else {
                                    alert("Error Ocurred, Try again");
                                    setStoreOtp("");
                                    handleCloseModal();
                                    localStorage.removeItem(
                                      `formId${id}_token`
                                    );
                                    localStorage.removeItem("login");
                                    navigate(
                                      `/scholarship/upsc/finance-form/${id}/login`
                                    );
                                  }
                                });
                            }
                          } else {
                            handlePostData(values, setValues);
                          }
                        }
                      }}
                    >
                      Submit
                    </Button>
                  )}

                  <Button
                    style={{
                      textTransform: "none",
                      color: "#E33900",
                    }}
                    variant="text"
                    onClick={handleOpen}
                  >
                    Clear Form
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        style={{
                          fontWeight: "570",
                        }}
                      >
                        Clear Form
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This will remove your answers from all questions, and
                        cannot be undone.
                      </Typography>

                      <div
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          style={{
                            marginRight: "6%",
                            color: "#5b5b5b",
                            textTransform: "none",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            color: "#5b5b5b",
                            textTransform: "none",
                          }}
                          onClick={handleReset}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
              <Modals show={showModal} handleClose={handleCloseModal}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "5px",

                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    Please enter the OTP sent to your mobile number{" "}
                    <span> +91{mobNumber} </span>
                    to verify your identity. This step ensures that only you,
                    the authorized user, can upload sensitive documents.
                  </p>
                  <p
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    For your security, do not share this OTP with anyone else.
                  </p>
                  <div
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: widthTotal > 800 ? "95%" : "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          paddingLeft: "2%",
                          height: "34.58px",

                          background: "#F0F0F0",
                          border: "1px solid #E2E2E2",
                          borderRadius: "4px",
                        }}
                        value={storeOtp}
                        type="text"
                        onChange={(e) => setStoreOtp(e.target.value)}
                        placeholder="OTP"
                      />
                    </div>

                    {inValidOTP ? (
                      <div
                        style={{
                          width: "95%",
                          marginTop: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Button
                          style={{
                            color: "#FF0000",
                            width: "fit-content",
                            height: "21px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "24px",
                            right: "0px",
                            textTransform: "none",
                          }}
                        >
                          Invalid OTP
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                    {resendOtp ? (
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          width: "95%",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            color: "#038E00",
                            fontSize: "14px",
                            width: "fit-content",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <CheckCircleIcon style={{ width: "20px" }} />
                          <p style={{ margin: "0px", padding: "0px" }}>
                            OTP resent
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="modalBtnDiv">
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "none",
                          backgroundColor: loading ? "white" : "#E33900",
                          width: "200px",
                          fontSize: "13px",
                          height: "36px",
                          border: loading && "none",
                          boxShadow: loading && "none",
                        }}
                        className="firstmodalBtn"
                        onClick={async () => {
                          setResendOtp(false);
                          if (storeOtp.toString().length == 4) {
                            await handlePostData(values, setValues);
                          } else {
                            alert("Otp should be 4 digits");
                          }
                        }}
                      >
                        {loading ? (
                          <CircularProgress size="4vh" />
                        ) : (
                          "Verify OTP"
                        )}
                      </Button>

                      <Button
                        style={{
                          textTransform: "none",
                          color: "blue",
                        }}
                        className="secondModalBtn"
                        onClick={() => {
                          setInvalidOtp(false);
                          setResendOtp(true);

                          if (otpResent) {
                            let num;
                            for (let i = 0; i < fieldsData.length; i++) {
                              if (fieldsData[i].type == "tel") {
                                num = dataFilled[fieldsData[i].name];
                              }
                            }
                            if (!num) {
                              alert("Number not present");
                            } else {
                              let num;
                              for (let i = 0; i < fieldsData.length; i++) {
                                if (
                                  fieldsData[i].type == "tel" &&
                                  fieldsData[i].name == "mobileno"
                                ) {
                                  num = dataFilled[fieldsData[i].name];
                                }
                              }
                              if (!num) {
                                alert("Number not present");
                              } else {
                                fetch(
                                  ` https://app.joshtalks.org/api/skill/v1/forms/otp/${num}/`,
                                  {
                                    headers: {
                                      Authorization: IdToken,
                                    },
                                  }
                                )
                                  .then((res) => res.json())
                                  .then((res) => {
                                    if (res.message == "opt sent to number") {
                                      setMobNumber(num);
                                      handleOpenModal();
                                    } else {
                                      localStorage.removeItem(
                                        `formId${id}_token`
                                      );
                                      localStorage.removeItem("login");
                                      navigate(
                                        `/scholarship/upsc/finance-form/${id}/login`
                                      );
                                    }
                                  });
                              }
                            }
                          }
                        }}
                      >
                        Resend OTP{" "}
                      </Button>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",

                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        By proceeding with the OTP verification, you confirm
                        that you are the intended user and take full
                        responsibility for the authenticity of the documents, to
                        the best of your knowledge.
                      </p>
                    </div>
                  </div>
                </div>
              </Modals>
            </div>
          );
        }}
      </Formik>

      {/*       
      <button onClick={handleDropOpenModal}> Hello</button> */}
    </div>
  );
}

export default Name;
