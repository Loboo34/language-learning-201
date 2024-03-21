import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";

const Language = ({ language }) => {
  const { id, name, duration, fee, students } = language;

  const handleEnroll = (userId) => {
    enroll({ languageId: id, userId });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>Name: {name}</Card.Title>
          <Card.Text>
            <Stack direction="horizontal" gap={3}>
              <Badge bg="primary">Duration: {duration}</Badge>
              <Badge bg="secondary">Fee: {fee}</Badge>
              <Badge bg="success">{students}</Badge>
            </Stack>
          </Card.Text>
          {/* <Link to={`/language/${language.id}`} className="btn btn-primary">
            View
          </Link> */}

          {/* <Enroll enroll={handleEnroll} /> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

Language.propTypes = {
  language: PropTypes.object.isRequired,
  // enroll: PropTypes.func.isRequired
};

export default Language;
