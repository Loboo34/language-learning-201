import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Button, Form, FloatingLabel } from "react-bootstrap";
import Wallet from "../components/Wallet";
import { login, logout as destroy } from "../utils/auth";
import { balance as principalBalance } from "../utils/ledger";
import { Notification } from "../components/utils/Notifications";
import Cover from "../components/utils/Cover";
//import Users from "./Users";

import Languages from "../components/language/Languages";

const LanguagesPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  const principal = window.auth.principalText;

  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    try {
      const balance = await principalBalance();
      setBalance(balance);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                principal={principal}
                symbol={"ICP"}
                isAuthenticated={isAuthenticated}
                destroy={destroy}
                balance={balance}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Languages />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} />
      )}
    </>
  );
};

export default LanguagesPage;
