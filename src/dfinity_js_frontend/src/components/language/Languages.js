import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddLanguage from "./AddLanguage";
import Language from "./Language";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getLanguages as getLanguagesList,
  createLanguage,
  buyLanguage,
} from "../../utils/languageLearning";
//import AddLanguage from "./AddLanguage";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of languages
  const getLanguages = useCallback(async () => {
    try {
      setLoading(true);
      setLanguages(await getLanguagesList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addLanguage = async (data) => {
    try {
      setLoading(true);
      const priceStr = data.price;
      data.price = parseInt(priceStr, 10) * 10 ** 8;
      createLanguage(data).then((resp) => {
        getLanguages();
      });
      toast(<NotificationSuccess text="Language added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a language." />);
    } finally {
      setLoading(false);
    }
  };

  //  function to initiate transaction
  const buy = async (id) => {
    try {
      setLoading(true);
      await buyLanguage({
        id,
      }).then((resp) => {
        getLanguages();
        toast(<NotificationSuccess text="Language bought successfully" />);
      });
    } catch (error) {
      toast(<NotificationError text="Failed to purchase language." />);
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
            <h1 className="fs-4 fw-bold mb-0">Street Food</h1>
            <AddLanguage save={addLanguage} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {languages.map((language, index) => (
              <Language key={index} Language={language} buy={buy} />
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
