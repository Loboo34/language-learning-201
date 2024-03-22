import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";
import UpdateUser from "./UpdateUser";

const User = ({ user }) => {
  const { id, name, phone, email, paymentMethod, languageEnrolled } = user;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column text-center">
          <Stack>
            <Card.Title>Name: {name}</Card.Title>
            {/* <UpdateUser user={user} save={update} /> */}
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">Email: {email}</Card.Text>
          <Card.Text className="flex-grow-1 ">Phone: {phone}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            paymentMethod: {paymentMethod}
          </Card.Text>
          <h3>Language:</h3>
          {languageEnrolled.map((languageEnrolled, index) => (
            <Card.Text key={index} className="flex-grow-1 ">
              {languageEnrolled}
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
};

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default User;
