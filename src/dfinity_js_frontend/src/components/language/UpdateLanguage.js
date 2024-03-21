import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel, Stack } from "react-bootstrap";

const UpdateLanguage = ({ language, save }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(language.name);
  const [duration, setDuration] = useState(language.duration);
  const [fee, setFee] = useState(language.fee);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => name && duration && fee;

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-pencil"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Language</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Stack gap={3}>
              <FloatingLabel
                controlId="inputName"
                label="Language name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter name of language"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="inputDurations"
                label="Duration"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={duration}
                  placeholder="Duration"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="inputFee" label="Fee" className="mb-3">
                <Form.Control
                  type="number"
                  value={fee}
                  placeholder="Fee"
                  onChange={(e) => {
                    setFee(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                save({ name, duration, fee });
                handleClose();
              }}
              disabled={!isFormFilled()}
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLanguage;
