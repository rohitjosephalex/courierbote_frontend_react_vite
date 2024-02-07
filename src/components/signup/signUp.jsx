import React, { useState } from "react";
import "./signinstyles.css";
import styled from "styled-components";
import AccountBox from "./components/accountBox/index"

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:50px
`;

export default function SignUp({Active}) {
console.log(Active)
  return <AppContainer>
    <AccountBox actives={Active} /> 
  </AppContainer>
}
