import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Button, Form, FloatingLabel } from "react-bootstrap";
import Wallet from "../components/Wallet";
import { login, logout as destroy } from "../utils/auth";
import { Notification } from "../components/utils/Notifications";
import Languages from "../components/language/Languages";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/sandwich.jpg";

const LanguagesPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;
  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container>
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                principal={principal}
                symbol={"ICP"}
                isAuthenticated={isAuthenticated}
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Languages />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};
export default LanguagesPage;
