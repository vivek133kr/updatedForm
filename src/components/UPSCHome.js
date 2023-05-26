import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const Logo = React.lazy(()=> import( "./FormComponents/Logo/Logo"));
const FirstComponent = React.lazy(()=> import("./FormComponents/FirstComponent/FirstComponent"));

const ThankyouComponent = React.lazy(() => import("./FormComponents/ThankyouComponent/ThankyouComponent"));

const UPSCName = React.lazy(() => import( "./FormComponents/NameComponent/UPSCName"));

function UPSCHome() {
  let [submitted, setSubmitted] = useState(false);
const formLoadCalled = useRef(false);
  const { id } = useParams();

  const [data, setData] = useState("");
  let [fieldList, setFieldList] = useState([]);
  useEffect(() => {
    if (id && !formLoadCalled.current) {
      fetch(`https://app.joshtalks.org/api/skill/v1/forms/${id}`)
        .then((res) => res.json())
        .then((data) => {
          document.title = data.title;
          setData(data);

          let tempList = data.field_list.sort((a, b) => {
            return a.sort_order - b.sort_order;
          });
          setFieldList(tempList);

          formLoadCalled.current = true;
        });
    }
  }, [id]);
  console.log(data, " fields", fieldList);
  return (
    <>
      {!data ? (
        <div>
          <div className="mt-3">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <div className="m-3">
          <Logo img={data.banner_link} />
          {submitted == false ? (
            <>
              <FirstComponent
                title={data.title}
                subtitle={data.subtitle}
                description={data.description}
              />
              <UPSCName allData={data} fields={fieldList} setSubmitted={setSubmitted} />
            </>
          ) : (
            <ThankyouComponent title={data.title} />
          )}
        </div>
      )}
    </>
  );
}

export default UPSCHome;
