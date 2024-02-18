import styled from 'styled-components';

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(200, 200, 200, 0.8);
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: #fb7736;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed #fb7736;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }


  &:focus {
    outline: none;
    border-bottom: 1px solid rgb(249, 144, 91);
  }
`;

export const SubmitButton = styled.button`  
  width: 100%;
  max-width: 150px;
  margin-top: 15px; /* Add margin to the top */
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 240ms ease-in-out;
  background: linear-gradient(
    58deg,  #ff7340 20%, #fb7736 100%
  );
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    filter: brightness(1.3);
  }
`;


export const LineText = styled.p`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
`;
export const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  font-weight: 500;
  margin:0;
`;