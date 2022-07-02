import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto;

  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background-color: #fff;
  margin: 5vh 0;
  padding: 20px;
  box-shadow: 0px 19px 39px rgba(0,0,0,.03),
  0px 15px 12px rgba(0,0,0,.1);

  a {
    color: #000;
    text-decoration: none;
  }

  .title {
    font-weight: bold;
  }
`;

const List = () => {

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('/api/post/list');
        console.log(response);

        if(response.data.success) {
          setPostList([...response.data.postList]);
        }

      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  return (
    <ListDiv>
        {postList.map((v,i) => {
          console.log(v);
          return (
            <ListItem key={i}>
              <Link to={`/post/${v.postNum}`}>
                <h3 className='title'>{v.title}</h3>
                <p>{v.content}</p>
              </Link>
            </ListItem>
          );
        })}
    </ListDiv>
  );
};

export default List;