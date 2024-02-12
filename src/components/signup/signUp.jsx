<<<<<<< HEAD
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
=======
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
>>>>>>> de582fe6711407c235dc5c8cc67553d42f5b17ca
