import React, { memo, useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const RepleUploadDiv = styled.div`
  width: 756px;
  margin: auto;

  form {
    width: 100%;
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-rows: 50px;

    @media (max-width: 756px) {
      grid-template-columns: 4fr 1fr;
      grid-template-rows: 40px;
      width: 90%;
    }

    input {
      /* width: 90%; */
      padding: 10px;
      height: 100%;
      border-radius: 10px 0 0 10px;
      border: .5px solid #c6c6c6;

      &:active,
      &focus {
        outline: none;
      }
    }

    button {
      height: 100%;
      border-radius: 0 10px 10px 0;
      border: .5px solid #c6c6c6;
      font-weight: bold;
      background-color: #c6c6c6;

      &:hover,
      &:active {
        border: .5px solid darkgrey;
        background-color: darkgrey;
      }
    }
  }
`;

const RepleUpload = memo(({ postId }) => {

  const [reple, setReple] = useState('');

  const { uid } = useSelector((state) => state.user);

  const onRepleChange = useCallback((e) => {
    setReple(e.currentTarget.value);
  }, []);

  const submitHandler = useCallback((e) => {
    e.preventDefault();

    if(!reple) {
      return alert('댓글 내용을 입력해주세요');
    };

    let body = {
      reple: reple,
      uid: uid,
      postId: postId,
    };

    (async () => {
      try {
        const response = await axios.post('/api/reple/submit', body);
        setReple('');

        if(!response.data.success) {
          alert('댓글 작성 실패');
        }
      } catch(err) {
        console.error(err);
      }
    })();

  }, [reple, uid, postId]);

  return (
    <RepleUploadDiv>
      <form>
        <input type="text" value={reple} onChange={onRepleChange} placeholder={'댓글을 입력해주세요'} />
        <button onClick={submitHandler}>등록</button>
      </form>
    </RepleUploadDiv>
  );
});

export default RepleUpload;