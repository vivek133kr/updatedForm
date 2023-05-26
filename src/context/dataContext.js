import { createContext } from "react";
import { useState } from "react";


export const DataContext = createContext({
  loginRequired: "",
  name: "",
  mainLoginEmail:"",
  email: "",
  profilePic: "",
  token: "",
  handleChange: () => {},
  handleToken: () => {},
  handleLoginRequired:()=>{},
  handlemainLoginEmail:()=>{}
});
export const DataContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [token, setToken] = useState("")
  const [loginRequired, setLoginRequired] = useState(false)
  const [mainLoginEmail, setMainLoginEmail] = useState(localStorage.getItem("mainEmail"))

  const handleChange = ({ name, email, profilePic }) => {
    if (name) setName(name);
    if (email) setEmail(email);
    if (profilePic) setProfilePic(profilePic);

  };
const handlemainLoginEmail = (mail) =>{
  setMainLoginEmail(mail)
}
  const handleToken = (token) =>{
    setToken(token)
  }
  
  const handleLoginRequired = (bool) =>{
    setLoginRequired(bool)
  }
  return (
    <DataContext.Provider value={{ name, mainLoginEmail, handlemainLoginEmail, email, profilePic, token, loginRequired, handleChange, handleToken, handleLoginRequired }}>
      {children}
    </DataContext.Provider>
  );
};