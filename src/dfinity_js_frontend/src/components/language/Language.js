import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";
import UpdateLanguage from "./UpdateLanguage";

const Language = ({ language, update }) => {
  const { id, name, duration, fee, students } = language;

  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <Card.Text>
            <Card.Title>{name}</Card.Title>
            <Badge>{id}</Badge>
            <Stack direction="horizontal" gap={3}>
              <span>Duration:</span>
              <Badge>{duration}</Badge>
              <span>Fee</span>
              <Badge>{fee}</Badge>
            </Stack>
            <span className=" pt-2">Students</span>
            <Badge>{students}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Language.propTypes = {
  language: PropTypes.object.isRequired,
};

export default Language;
