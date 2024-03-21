import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Enroll = ({ show, userId, save }) => {
  const [userId, setUserId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isFormFilled = () => userId;

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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                save(userId);
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



Enroll.propTypes = {
  show: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default Enroll;
