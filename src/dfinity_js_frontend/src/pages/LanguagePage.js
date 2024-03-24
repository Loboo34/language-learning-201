import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Button, Form, FloatingLabel } from "react-bootstrap";
import Wallet from "../components/Wallet";
import { login, logout as destroy } from "../utils/auth";
import { balance as principalBalance } from "../utils/ledger";
import { Notification } from "../components/utils/Notifications";
import Languages from "../components/language/Languages";
import StatusButton from "../components/language/LanguageStatus";

const LanguagesPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;

   return (
     <>
       {isAuthenticated ? (
         <Container fluid="md">
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
               <span>Please login to continue</span>
               <Button variant="primary" onClick={login}>
                 Login
               </Button>
             </div>
           </Container>
         </div>
       )}
     </>
   );
  
};
export default LanguagesPage;
