import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Unenroll = ({ unenroll }) => {
  const [userId, setUserId] = useState("");
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => userId ;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        unEnroll
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>UnEnroll</Modal.Title>
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
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                unenroll(userId);
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

Unenroll.propTypes = {
  unenroll: PropTypes.func.isRequired,
};
export default Unenroll;
