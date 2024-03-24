import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const DropLanguage = ({ save }) => {
  const [languageId, setLanguageId] = useState("");
  const [userId, setUserId] = useState("");

  const [show, setShow] = useState(false);

  const isFormFilled = () => userId && languageId;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        Drop
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Drop Language</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUserId"
              label="user ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="Enter user ID"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputLanguageId"
              label="Language ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={languageId}
                onChange={(e) => {
                  setLanguageId(e.target.value);
                }}
                placeholder="Enter language ID"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                save(userId, languageId);
                handleClose();
              }}
              disabled={!isFormFilled()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

DropLanguage.propTypes = {
  save: PropTypes.func.isRequired,
};

export default DropLanguage;
