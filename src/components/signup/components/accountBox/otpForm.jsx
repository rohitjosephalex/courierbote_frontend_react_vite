import React, { useContext, useState ,useEffect} from "react";
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
import { BrowserRouter as Routes, Route, Link, useNavigate } from 'react-router-dom';

export function OtpForm() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const { email, setEmail, password, companyName,setCompanyName,setPassword } = useContext(MyContext);
    const { switchToSignup, switchToSignin } = useContext(AccountContext);
    const [error, setError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
    const [resendTimer, setResendTimer] = useState(30); // 30 minutes in seconds
    const initialValues = {
        otp: [
          { digit: "" },
          { digit: "" },
          { digit: "" },
          { digit: "" },
          { digit: "" },
          { digit: "" },
        ]
      };
      
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setResendTimer(prevTimer => {
                if (prevTimer === 0) {
                    setResendButtonDisabled(false); // Enable button when timer reaches 0
                    return 30; // Reset timer to 30 seconds
                } else {
                    return prevTimer - 1; // Decrement timer by 1 second
                }
            });
        }, 1000); // Update timer every second
    
        return () => clearInterval(timerInterval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        // Enable resend button when timer reaches 0
        if (resendTimer === 0) {
            setResendButtonDisabled(false);
        }
    }, [resendTimer]);
    const handleResendOtp = async () => {
        try {
            console.log('resend')
            setResendButtonDisabled(true);
            setTimeout(() => {
                setResendButtonDisabled(false);
                setResendTimer(30); // Reset the timer
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
            try {
                let finalOtp = values.otp.map((item) => item.digit).join("");
                if (!finalOtp) {
                    setError('! Please fill in all fields');
                    return;
                }
                else if (!/^\d{6}$/.test(finalOtp)) {
                    setError("! OTP cannot contain whitespace characters");
                    return;
                }
    
                else if (finalOtp) {
                    setButtonLoading(true);
                    const requestData = {
                        email: email,
                        otp: finalOtp,
                        password: password,
                        comapanyName: companyName
                    };
                    const response = await axios.post('https://backend.courierbote.com/api/corporateuser/newuserverification', requestData);
                    if (response.status === 200) {
                        setError("")
                        navigate('/corporate/signin');
                        switchToSignin();
                        setPassword("");
                        setPassword("");
                        setCompanyName("")
                        setEmail("")
                        setButtonLoading(false);
                    } else {
                        // Handle other status codes here
                        setError("Please Try again or Contact Admin")
                        console.log('Error:', response.status, response.data);
                        setButtonLoading(false);
                    }
                }


            } catch (error) {
                console.error("Error while setting OTP:", error);
                if (error.response.status === 401) {
                    setError('Wrong otp');
                    setButtonLoading(false);
                }
                else {
                    setError(error.response.data.errorName);
                    setButtonLoading(false);
                }
            }
        },
    });


    const handleValidate = async () => {
        try {
            // Ensure Formik validation has completed
            await formik.validateForm();

            // If there are validation errors, stop processing
            if (Object.keys(formik.errors).length !== 0) {
                console.log("Form validation errors:", formik.errors);
                return;
            }

            // Proceed with Formik handleSubmit
            await formik.handleSubmit();
            
   
        }

        catch (error) {
            console.error('Error during verfying otp:', error);

           
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
                <OtpContainer formik={formik} initialValues={initialValues} />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <div className="button-class">
                            {error && (
                                <div className="error-text-container">
                                    <p className="error-text">{error}</p>
                                </div>
                            )}
            <SubmitButton type="submit" onClick={handleValidate} style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>
                {!buttonLoading ? 'Validate' : 'loading...'}
            </SubmitButton>
            </div>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Didn't recive the OTP?{" "}
                <BoldLink onClick={handleResendOtp} disabled={resendButtonDisabled} style={{ pointerEvents: resendButtonDisabled ? 'none' : 'auto' }}>
                    {resendButtonDisabled ? `Resend in ${resendTimer} seconds` : 'Resend'}
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}