import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";
import UpdateLanguage from "./UpdateLanguage";
import Enroll from "./Enroll";

const Language = ({ language, update, enroll }) => {
  const { id, name, duration, fee, students } = language;

  const handleEnroll = (userId) => {
    enroll({ languageId: id, userId });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100 position-relative">
        <Card.Body>
          <div className="position-absolute top-0 end-0">
            <UpdateLanguage save={update} />
          </div>
          <Card.Text>
            <Card.Title>{name}</Card.Title>
            <Stack direction="horizontal" gap={3}>
              <Badge>Duration: {duration}</Badge>
              <Badge>Fee: {fee}</Badge>
              <Badge>{students}</Badge>
            </Stack>
          </Card.Text>
          {/* <Link to={`/language/${language.id}`} className="btn btn-primary">
            View
          </Link> */}

          <Enroll enroll={handleEnroll} />
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
