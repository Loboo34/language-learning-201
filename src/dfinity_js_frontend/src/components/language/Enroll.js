import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Enroll = ({ save }) => {
  const [userId, setUserId] = useState("");
  const [languageId, setLanguageId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => userId && languageId;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        Enroll
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enroll</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUserId"
              label="User ID"
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
                placeholder="Enter Language ID"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                save(userId, languageId);
                handleClose();
              }}
            >
              Enroll
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Enroll.propTypes = {
  save: PropTypes.func.isRequired,
};
export default Enroll;
