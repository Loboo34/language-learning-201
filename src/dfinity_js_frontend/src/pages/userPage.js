import React from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy } from "../utils/auth";
import Wallet from "../components/Wallet";
import Users from "../components/user/Users";
import { Notification } from "../components/utils/Notifications";
import StatusButton from "../components/language/LanguageStatus";

const UsersPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  //const principal = window.auth.principalText;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Users />
            <StatusButton />
          </main>
        </Container>
      ) : (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">Hello</Nav>
        </Container>
      )}
    </>
  );
};

export default UsersPage;
