import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";

const Language = ({ language, buy}) => {
const { id, name, duration, fee, students} = language

  const triggerBuy = () => {
    buy(id);
  };
  return(
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{Principal.from(seller).toText()}</span>
            <Badge bg="secondary" className="ms-auto">
              {soldAmount.toString()} Sold
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{duration}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{fee}</span>
          </Card.Text>
          <Card.Text className="flex-grow-1 ">Students: {students}</Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {(price / BigInt(10**8)).toString()} ICP
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )

}

Language.propTypes = {
  language: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};


export default Language;