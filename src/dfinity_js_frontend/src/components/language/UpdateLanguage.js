import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel, Stack } from "react-bootstrap";

const UpdateLanguage = ({ language, save }) => {
 
  const initialDuration = language ? language.duration : "";
  const initialFee = language ? language.fee : "";

  const [duration, setDuration] = useState(initialDuration);
  const [fee, setFee] = useState(initialFee);

  const isFormFilled = () => duration && fee;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        onClick={handleShow}
        variant=""
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
                controlId="inputDurations"
                label="Duration"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="inputFee" label="Fee" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Fee"
                  value={fee}
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
                save({ id: language.id, duration, fee });
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
