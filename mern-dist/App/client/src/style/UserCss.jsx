import styled from 'styled-components';

const LoginDiv = styled.div`
  position: absolute;
  /* margin: auto; */
  width: 450px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    /* width: 70%; */
    padding: 20px;
    box-shadow: 0px 19px 38px rgba(0,0,0,.03),
      0px 15px 12px rgba(0,0,0,.1);
    flex-direction: column;

    label {
      font-weight: bold;
    }

    input {
      border-radius: 10px;
      border: 1px solid #c6c6c6;
      padding: 10px;
      margin-bottom: 10px;

      &:active,
      &:focus {
        outline: none;
      }
    }

    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
      margin-top: 10px;

      &:hover {
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      }
    }

    @media (max-width: 750px) {
        width: 100%;
    }
  }
`;

export default LoginDiv;