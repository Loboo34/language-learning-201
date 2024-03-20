import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import Language from "./Language";

import {
  createlanguage,
  updateLanguage,
  getLanguages as getLanguageList,
} from "../../utils/languageLearning";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLanguages = useCallback(async () => {
    setLoading(true);
    const languageList = await getLanguageList();
    setLanguages(languageList);
    setLoading(false);
  }, []);

  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  const createLanguage = async (language) => {
    setLoading(true);
    try {
      await createlanguage(language);
      toast.success("Language created successfully");
      getLanguages();
    } catch (error) {
      toast.error("Error creating language");
    }
    setLoading(false);
  }

  const updateLanguageData = async (language) => {
    setLoading(true);
    try {
      await updateLanguage(language);
      toast.success("Language updated successfully");
      getLanguages();
    } catch (error) {
      toast.error("Error updating language");
    }
    setLoading(false);
  }


  return(
    <div>
      <NotificationSuccess />
      <NotificationError />
      <Loader loading={loading} />
      <Row>
        {languages.map((language) => (
          <Language key={language.id} language={language} updateLanguage={updateLanguageData} />
        ))}
      </Row>
    </div>
  )
};

export default Languages;
