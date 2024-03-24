import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../utils/Loader";
import {
  enrollUser,
  getUsers as getUserList,
  unenrollUser,
  dropLanguage,
} from "../../utils/languageLearning";
import Enroll from "./Enroll";
import DropLanguage from "./DropLanguage";
import Unenroll from "./Unenroll";

const StatusButton = () => {
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      await getUserList();
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  //enroll
  const enroll = async (userId, languageId) => {
    try {
      setLoading(true);
      enrollUser(userId, languageId).then(() => {
        getUsers();
      });
      toast(<NotificationSuccess text="User enrolled." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to enroll user." />);
    } finally {
      setLoading(false);
    }
  };

  const unenroll = async (userId, languageId) => {
    try {
      setLoading(true);
      unenrollUser(userId, languageId).then(() => {
        getUsers();
      });
      toast(<NotificationSuccess text="User sucessfuli unenrolled." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to unenroll." />);
    } finally {
      setLoading(false);
    }
  };

  const drop = async (userId, languageId) => {
    try {
      setLoading(true);
      dropLanguage(userId, languageId).then(() => {
        getUsers();
      });
      toast(<NotificationSuccess text="User sucessfuli unenrolled." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to unenroll." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!loading ? (
        <Container className="my-3">
          <Row className="px-0">
            <Col xs="auto">
              <Enroll save={enroll} />
            </Col>
            <Col xs="auto">
              <Unenroll save={unenroll} />
            </Col>
            <Col xs="auto">
              <DropLanguage save={drop} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StatusButton;
