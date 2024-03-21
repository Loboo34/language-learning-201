import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  createlanguage,
  updateLanguage,
  getLanguages as getLanguageList,
} from "../../utils/languageLearning";
import Language from "./Language";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLanguages = useCallback(async () => {
    try {
      setLoading(true);
      setLanguages(await getLanguageList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });



  useEffect(() => {
    getLanguages();
  }, []);

  // const createLanguage = async (language) => {
  //   setLoading(true);
  //   try {
  //     await createlanguage(language);
  //     toast.success("Language created successfully");
  //     getLanguages();
  //   } catch (error) {
  //     toast.error("Error creating language");
  //   }
  //   setLoading(false);
  // }
  // const updateLanguage = async (data) => {
  //     try {
  //       setLoading(true);
  //       const maxSlotsStr = data.maxSlots;
  //       data.maxSlots = parseInt(maxSlotsStr, 10) * 10 ** 8;
  //       updateLanguage(data).then((resp) => {
  //         getLanguages();
  //         toast(<NotificationSuccess text="Language Added." />);
  //       });
  //     } catch (error) {
  //       console.log({ error });
  //       toast(<NotificationError text="Failed to add language." />);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      {!loading ? (
        <>
          <div className="">
            <h1 className="">Languages</h1>
            {/* <Link
              to="/users"
              className="justify-content-start py-2 px-3 my-2 bg-secondary text-white rounded-pill "
            >
              Users
            </Link> */}
            <div className="">
              <div className="mr-6">Add Language</div>
            </div>
          </div>
          <Row xs={1} sm={2} lg={3} className="">
            {languages.map((_language, index) => (
              <Language
                key={index}
                language={{
                  ..._language,
                }}

                //updateLanguage={updateLanguage}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Languages;
