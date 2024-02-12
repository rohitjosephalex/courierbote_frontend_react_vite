<<<<<<< HEAD
import React, { useContext, useState } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    LineText,
    SubmitButton,
    ErrorText
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import { MyContext } from "./MyContext";
import OtpContainer from "../../../otpColumn/otpcolumn";
import { useFormik } from "formik";
import axios from 'axios';


export function OtpForm() {

    const [otp, setOtp] = useState("");
    const { email, setEmail, password, companyName, } = useContext(MyContext);
    const { switchToSignup ,switchToSignin} = useContext(AccountContext);
    const [error, setError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30); // 30 minutes in seconds

    const handleResendOtp = async() => {
        try {
            console.log('resend')
            setResendButtonDisabled(true);
            setTimeout(() => {
                setResendButtonDisabled(false);
                setResendTimer(30 ); // Reset the timer
            }, 30 * 1000); 
            const requestData = {
              email: email
            };
    
            const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserregistration', requestData);
    
            if (response.status === 200) {
             console.log("otp sent")
                // Set the timer to re-enable the resend button after 30 minutes
       
            } else {
              // Handle other status codes here
              console.log('Error:', response.status, response.data);
            }
          } catch (error) {
            console.error('Error during sign-up:', error.response);
    
            if (error.response.status === 409)
              setError('Email already exist');
            else 
            setError(error.response.data.errorName);
          }
    }

    const formik = useFormik({
        initialValues: {
            otp: [{ digit: "" }, { digit: "" }, { digit: "" }, { digit: "" }],
        },
        onSubmit: async (values) => {
            let finalOtp = values.otp.map((item) => item.digit).join("");
            setOtp(finalOtp)
            console.log(otp);
        },
    });

    const handleValidate = async () => {
        try {
            await formik.handleSubmit();
            if (!otp) {
                setError('! Please fill in all fields');
                return;
            }
            else if (!/^\d{6}$/.test(otp)) {
                setError("! OTP cannot contain whitespace characters");
                return;
            }

            else if (otp) {
                setButtonLoading(true);
                const requestData = {
                    email: email,
                    otp: otp,
                    password: password,
                    comapanyName: companyName
                };
                const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserverification', requestData);
                if (response.status === 200) {
                     history.push('/corporate/signin');
                  } else {
                    // Handle other status codes here
                    console.log('Error:', response.status, response.data);
                  }
                } 
              }
            
              catch (error) {
                console.error('Error during verfying otp:', error.response);
        
                if (error.response.status === 401)
                  setError('Wrong otp');
                else 
                setError(error.response.data.errorName);
              }
    };




    return (
        <BoxContainer>
            <FormContainer>
                <div className="otp-send">
                    An One-Time Password (OTP) has been sent to {email}
                </div>
                <LineText className="wrong-email">
                    <BoldLink onClick={switchToSignup}>
                        wrong email?
                    </BoldLink>
                </LineText>
                <OtpContainer formik={formik} />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            {error && <ErrorText>{error}</ErrorText>}
            <SubmitButton type="submit" onClick={handleValidate}>
            {!buttonLoading ? 'Validate' : 'loading...'}
            </SubmitButton>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Didn't recive the OTP?{" "}
                <BoldLink onClick={handleResendOtp}  disabled={resendButtonDisabled}>
                {resendButtonDisabled ? `Resend in ${resendTimer} seconds` : 'Resend'}
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
=======
import React, { useContext, useState } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    LineText,
    SubmitButton,
    ErrorText
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import { MyContext } from "./MyContext";
import OtpContainer from "../../../otpColumn/otpcolumn";
import { useFormik } from "formik";
import axios from 'axios';


export function OtpForm() {

    const [otp, setOtp] = useState("");
    const { email, setEmail, password, companyName, } = useContext(MyContext);
    const { switchToSignup ,switchToSignin} = useContext(AccountContext);
    const [error, setError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30); // 30 minutes in seconds

    const handleResendOtp = async() => {
        try {
            console.log('resend')
            setResendButtonDisabled(true);
            setTimeout(() => {
                setResendButtonDisabled(false);
                setResendTimer(30 ); // Reset the timer
            }, 30 * 1000); 
            const requestData = {
              email: email
            };
    
            const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserregistration', requestData);
    
            if (response.status === 200) {
             console.log("otp sent")
                // Set the timer to re-enable the resend button after 30 minutes
       
            } else {
              // Handle other status codes here
              console.log('Error:', response.status, response.data);
            }
          } catch (error) {
            console.error('Error during sign-up:', error.response);
    
            if (error.response.status === 409)
              setError('Email already exist');
            else 
            setError(error.response.data.errorName);
          }
    }

    const formik = useFormik({
        initialValues: {
            otp: [{ digit: "" }, { digit: "" }, { digit: "" }, { digit: "" }],
        },
        onSubmit: async (values) => {
            let finalOtp = values.otp.map((item) => item.digit).join("");
            setOtp(finalOtp)
            console.log(otp);
        },
    });

    const handleValidate = async () => {
        try {
            await formik.handleSubmit();
            if (!otp) {
                setError('! Please fill in all fields');
                return;
            }
            else if (!/^\d{6}$/.test(otp)) {
                setError("! OTP cannot contain whitespace characters");
                return;
            }

            else if (otp) {
                setButtonLoading(true);
                const requestData = {
                    email: email,
                    otp: otp,
                    password: password,
                    comapanyName: companyName
                };
                const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserverification', requestData);
                if (response.status === 200) {
                     history.push('/corporate/signin');
                  } else {
                    // Handle other status codes here
                    console.log('Error:', response.status, response.data);
                  }
                } 
              }
            
              catch (error) {
                console.error('Error during verfying otp:', error.response);
        
                if (error.response.status === 401)
                  setError('Wrong otp');
                else 
                setError(error.response.data.errorName);
              }
    };




    return (
        <BoxContainer>
            <FormContainer>
                <div className="otp-send">
                    An One-Time Password (OTP) has been sent to {email}
                </div>
                <LineText className="wrong-email">
                    <BoldLink onClick={switchToSignup}>
                        wrong email?
                    </BoldLink>
                </LineText>
                <OtpContainer formik={formik} />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            {error && <ErrorText>{error}</ErrorText>}
            <SubmitButton type="submit" onClick={handleValidate}>
            {!buttonLoading ? 'Validate' : 'loading...'}
            </SubmitButton>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Didn't recive the OTP?{" "}
                <BoldLink onClick={handleResendOtp}  disabled={resendButtonDisabled}>
                {resendButtonDisabled ? `Resend in ${resendTimer} seconds` : 'Resend'}
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
>>>>>>> de582fe6711407c235dc5c8cc67553d42f5b17ca
}