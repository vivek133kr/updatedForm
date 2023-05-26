import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";

import { DataContext } from "../context/dataContext";

export const PrivateLoginRoute = ({ children }) => {
  const { id } = useParams();
  let {loginRequired} = useContext(DataContext)
  let [login, setLogin] = useState(localStorage.getItem("login"));
  let [token, setToken] = useState(localStorage.getItem(`formId${id}_token`));
  if (login == "done" && token!= undefined  || loginRequired == false) {
    return <Navigate to={`/scholarship/upsc/finance-form/${id}`} />;
  }
  return children;
};
