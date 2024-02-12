import { useFormik } from "formik";
import "./otpstyles.css";
import {React,useContext, useState} from "react";

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

export default function OtpContainer({ formik }) {


  const handleOTPChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    element: string
  ) => {
    if (event.target.value === "") {
      return;
    }
    formik.setFieldValue(element, event.target.value);
    const nextElementSibling = event.target
      .nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    element: string
  ) => {
    const target = e.target as HTMLInputElement;
    formik.setFieldValue(element, "");

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  return (
      <div className="otp-conatiner">
        <div className="otp-inputs">
          {initialValues.otp.map((item, index) => {
            return (
              <input
                key={index}
                className="otp-input"
                type="number"
                {...formik.getFieldProps(`otp.${index}.digit`)}
                onChange={(event) =>
                  handleOTPChange(event, `otp.${index}.digit`)
                }
                onKeyDown={(event) =>
                  inputOnKeyDown(event, `otp.${index}.digit`)
                }
                autoComplete="one-time-code"
                maxLength={1}
              />
            );
          })}
        </div>
      </div>
  );
}
