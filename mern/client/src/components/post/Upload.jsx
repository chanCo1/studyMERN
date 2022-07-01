import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Upload = ({ contentList, setContentList }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) {
      return alert('모든 항목을 채워주세요!');
    };

    let body = {
      title: title,
      content: content,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/submit', body);
        console.log(response);

        if(response.data.success) {
          alert('글 작성이 완료 되었습니다.');
          navigate('/');
        } else {
          alert('글 작성에 실패 하였습니다.');
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  const onChangeTitle = useCallback((e) => {
    setTitle(e.currentTarget.value)
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.currentTarget.value)
  }, []);

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={onChangeTitle} 
        />
        <label htmlFor="content">내용</label>
        <textarea
          type="text" 
          id="title" 
          value={content} 
          onChange={onChangeContent}
        />
        <UploadButtonDiv>
          <button onClick={onSubmit}>제출!</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Upload;
