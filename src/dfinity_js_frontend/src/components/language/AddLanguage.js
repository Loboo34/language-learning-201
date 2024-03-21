import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";


const AddLanguage = ({save}) => {
const [name, setName] = useState("");
const [durations, setDuration] = useState("");
const [fee, setFee] = useState(0);
//const [students, setStudents] = useState(0);

const isFormFilled = () => name && durations && fee;

const [show, setShow] = useState(false);

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
        <i className="bi bi-plus"></i>
     </Button>
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Language</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Language name"
              className="mb-3"
            >
              <Form.Control
                type="text"
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
                placeholder="Duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputFee"
              label="Fee"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Fee"
                onChange={(e) => {
                  setFee(e.target.value);
                }}
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
                if (isFormFilled()) {
                  save({ name, durations, fee });
                  handleClose();
                }
              }}
            >
              Save
            </Button> 
          </Modal.Footer>
        </Form>
        </Modal>

        </>
  )
}

 AddLanguage.propTypes = {
   save: PropTypes.func.isRequired,
};

export default AddLanguage