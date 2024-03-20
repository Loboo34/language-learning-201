import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Button, Form, FloatingLabel } from "react-bootstrap";
import Wallet from "../components/Wallet";
import { login, logout as destroy } from "../utils/auth";
import { balance as principalBalance } from "../utils/ledger";
import { Notification } from "../components/utils/Notifications";
import Languages from "../components/language/Languages";

const LanguagesPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (isAuthenticated) {
      setBalance(await principalBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      {isAuthenticated ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                principal={principal}
                balance={balance}
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
        <div>
          <Notification />
          <Container>
            <div className="text-center">
              <h1>Welcome to the Language Learning Platform</h1>
              <p>
                Please login to continue
              </p>
              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
export default LanguagesPage;

