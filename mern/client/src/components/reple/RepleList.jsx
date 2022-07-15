import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import RepleContent from './RepleContent';

const RepleListDiv = styled.div`
  margin-top: 1rem;
`;

const RepleAreaDiv = styled.div`
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto;

  @media (max-width: 756px) {
    width: 90%;
  }
`;


const RepleList = memo(({ postId }) => {

  const [repleList, setRepleList] = useState([]);

  useEffect(() => {

    let body = {
      postId: postId,
    };

    (async () => {
      try {
        const response = await axios.post('/api/reple/getReple', body);

        if(response.data.success) {
          setRepleList([...response.data.repleList]);
        }
      } catch(err) {
        console.error(err);
      }
    })();
  }, [postId, repleList])
  
 
  return (
    <RepleListDiv>
      {repleList.map((v,i) => {
        return <RepleContent reple={v} key={i} />
      })}
    </RepleListDiv>
  );
});

export default RepleList;