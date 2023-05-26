
import "./App.css";
import { Routes, Route} from "react-router-dom";
import React from "react";


import { PrivateLoginRoute } from "./components/loginRoute";



import { GoogleOAuthProvider } from "@react-oauth/google";
const BasicModal = React.lazy(() =>
  import("./components/FormComponents/NameComponent/GooglePopUp")
);
const Home =  React.lazy(() =>
  import("./components/Home")
);
const UPSCHome = React.lazy(() => import("./components/UPSCHome"));
function App() {


  
  

  return (
    <div>
      <Routes>
        <Route
          path={`/scholarship/upsc/submit-form/:id`}
          element={<UPSCHome />}
        />

        <Route
          path={`/scholarship/upsc/finance-form/:id`}
          element={
            <GoogleOAuthProvider clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com">
              <Home />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path={`/scholarship/upsc/finance-form/:id/login`}
          element={
            <PrivateLoginRoute>
              <GoogleOAuthProvider clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com">
                <BasicModal />
              </GoogleOAuthProvider>
            </PrivateLoginRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
