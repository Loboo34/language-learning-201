import React, { useState } from "react";
import { Button, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";

const UpdateUser = ({ user, save }) => {
  const [email, setEmail] = useState(user.email);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [paymentMethod, setPaymentMethod] = useState(user.paymentMethod);

  const isFormFilled = () => email && phoneNo && paymentMethod;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        //variant="dark"
        className="rounded-pill"
        // style={{ width: "38px" }}
      >
        <i className="bi bi-pencil-square"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Stack>
            <Modal.Title>Update User</Modal.Title>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputPhoneNo"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Phone Number"
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
              save({
                id: user.id,
                email,
                phoneNo,
                paymentMethod,
              });
              handleClose();
            }}
          >
            Save user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUser;
