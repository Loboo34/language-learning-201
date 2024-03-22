import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  createlanguage,
  updateLanguage,
  getLanguages as getLanguageList,
} from "../../utils/languageLearning";
import Language from "./Language";
import AddLanguage from "./AddLanguage";

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

  const addLanguage = async (language) => {
    try {
      setLoading(true);
      createlanguage(language).then((res) => {
        getLanguages();
      });
      toast.success("Language created successfully");
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create language." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      updateLanguage(data).then((resp) => {
        getLanguages();
        toast(<NotificationSuccess text="Language Added." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add language." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Language</h1>
            <Link
              to="/users"
              className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white rounded-pill "
            >
              Users Page
            </Link>
          </div>
          <Row xs={1} sm={2} lg={3} className="">
            {languages.map((_language, index) => (
              <Language
                key={index}
                language={{
                  ..._language,
                }}
                update={update}
              />
            ))}
          </Row>
          <div className="aling-items-center">
            {/* <div className="">Add Language</div> */}
            <AddLanguage save={addLanguage} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Languages;
