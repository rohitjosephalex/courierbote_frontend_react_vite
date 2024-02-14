import React, { useContext, useState } from "react";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
  ErrorText
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import { BrowserRouter as Routes, Route, Link, useNavigate } from 'react-router-dom';
import CorporateDashboard from '../../../../components/dashboard/CorperateDashboard'
import axios from 'axios';
export function LoginForm(props) {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { switchToSignup } = useContext(AccountContext);

  const handleSignin = async () => {
    setButtonLoading(true);
    let proceed = 0;
    if (!userEmail || !password) {
      setError('Please fill in all fields');
      setButtonLoading(false);
      proceed = 1;
      return;
    }
    setError("")
    if (proceed == 0) {
      try {
        const requestData = {
          email: userEmail,
          password: password,
        };
        const response = await axios.post('https://backend.courierbote.com/api/corporateuser/login', requestData);
        if (response.status === 200) {
          sessionStorage.setItem('api_token', response.data.api_token);
          sessionStorage.setItem('userid', response.data.userid);
          sessionStorage.setItem('expirationTime', response.data.expirationTime);
          sessionStorage.setItem('timerStart', Math.floor(Date.now() / 1000));
          setButtonLoading(false);
          navigate('/corporate/dashboard');
        } else {
          // Handle other status codes here
          console.log('Error:', response.status, response.data);
        }
      }
      catch (error) {

        console.error('Error during verfying otp:', error.response.data);

        if (error.response.status === 400) {
          setButtonLoading(false);
          setError("No such email is registered")
        }

        else if (error.response.status === 401) {
          setButtonLoading(false);
          setError('Wrong Password');
        }
        else {
          setButtonLoading(false);
          setError(error.response.data.errorName);
        }
      }
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      {error && <ErrorText>{error}</ErrorText>}
      <SubmitButton type="submit" onClick={handleSignin}  style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>  {!buttonLoading ? 'Signin' : 'loading...'}</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} >

          <Link className='link' to="/corporate/signup">Signup</Link>
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}