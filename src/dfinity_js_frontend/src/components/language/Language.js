import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import Enroll from "./Enroll";
import Unenroll from "./Unenroll";

const Language = ({ language, enroll, unenroll }) => {
  const { id, name, duration, fee, students } = language;

  const triggerEnroll = (userId) => {
    enroll({
      userId,
      languageId: id,
    });
  };

  const triggerUnenroll = (userId) => {
    unenroll({
      userId,
      languageId: id,
    });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <>
            <Card.Title>{name}</Card.Title>
            <Badge>ID:{id}</Badge>
            <Stack direction="horizontal" gap={3}>
              <span>Duration:</span>
              <Badge>{duration}</Badge>
              <span>Fee:</span>
              <Badge>{fee}</Badge>
            </Stack>
            <span className=" pt-2">Students:</span>
            <Card.Text>{students}</Card.Text>
          </>

          <Card.Footer className="d-flex justify-content-between">
            <Enroll enroll={triggerEnroll} />
            <Unenroll unenroll={triggerUnenroll} />
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
};

Language.propTypes = {
  language: PropTypes.object.isRequired,
};

export default Language;
