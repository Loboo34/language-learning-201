import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddUser = ({ save }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
 

  const isFormFilled = () => name && email && phoneNo && paymentMethod;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="d-flex"
        //style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
        <span className="fs-6">ADD user</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="User name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of user"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="email"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhoneNumber"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="selectPaymentMethod"
              label="Payment Method"
              className="mb-3"
            >
              <Form.Select
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </Form.Select>
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              if (isFormFilled()) {
                save({
                  name,
                  email,
                  phoneNo,
                  paymentMethod,
                });
                handleClose();
              }
            }}
          >
            Save user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddUser.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddUser;
