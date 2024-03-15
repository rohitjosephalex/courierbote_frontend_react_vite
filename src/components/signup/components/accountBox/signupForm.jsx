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
import { MyContext } from "./MyContext";
import { Link } from 'react-router-dom';
import axios from 'axios';

export function SignupForm(props) {
  const { companyName, setCompanyName } = useContext(MyContext);
  const { email, setEmail } = useContext(MyContext);
  const { password, setPassword } = useContext(MyContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const { switchToSignin, switchToOtp } = useContext(AccountContext);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    let proceed = 0;
    if (!companyName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      proceed = 1;
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match');
      proceed = 1;
      return;
    }

    setError("");

    if (proceed === 0) {
      setButtonLoading(true);
      try {
        const requestData = {
          email: email
        };

        const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserregistration', requestData);
console.log("response")
        if (response.status === 200) {
          switchToOtp();
        } else {
          console.log('Error:', response.status, response.data);
        }
      } catch (error) {
        console.error('Error during sign-up:', error.response);

        if (error.response.status === 409) {
          setError('Email already exists');
        } else {
          setError(error.response.data.errorName);
        }
      } finally {
        setButtonLoading(false);
      }
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <ErrorText style={{ visibility: error ? 'visible' : 'hidden' }}>{error}</ErrorText>
       */}
       <div className="button-class">
                            {error && (
                                <div className="error-text-container">
                                    <p className="error-text">{error}</p>
                                </div>
                            )}
      <SubmitButton type="submit" disabled={buttonLoading} onClick={handleSignUp} >
        {!buttonLoading ? 'Signup' : 'Loading...'}
      </SubmitButton>
      </div>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} >
          <Link className='link' to="/corporate/signin">
            Signin
          </Link>
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
