import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { dropLanguage } from "../../utils/languageLearning";

const DropLanguage = ({ show, languageId, save }) => {
  const [show, setShow] = useState(false);

  const [languageId, setLanguageId] = useState("");

  const isFormFilled = () => languageId;

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
            <i className="bi bi-trash"></i>
        </Button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Drop Language</Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
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
                    save(languageId);
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
  show: PropTypes.bool.isRequired,
  languageId: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default DropLanguage;
