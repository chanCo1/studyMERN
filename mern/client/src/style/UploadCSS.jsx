import styled from '@emotion/styled';

const UploadDiv = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const UploadForm = styled.form`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-top: 10px;
  }

  input {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;

    &:active,
    &:focus {
      outline: none;
    } 
  }

  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;

    &:active,
    &:focus {
      outline: none;
    }

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0 0 5px whitesmoke;
    }
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;

  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;

    &:hover {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
    }
  }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };

// import { UploadDiv, UploadForm, UploadButtonDiv } from '../style/UploadCSS';