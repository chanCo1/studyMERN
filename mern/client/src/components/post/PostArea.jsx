import React, { memo, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Detail from './Detail';
import RepleArea from '../reple/RepleArea';

const SpinnerDiv = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

const PostArea = memo(() => {
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);

  const params = useParams();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/detail', body);

        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [params]);

  return (
    <div>
      {flag ? (
        <>
          <Detail postInfo={postInfo} />
          <RepleArea postId={postInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
});

export default PostArea;
