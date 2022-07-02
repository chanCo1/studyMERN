import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const Detail = () => {

  const params = useParams();

  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(()=> {
    let body = {
      postNum: params.postNum,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/detail',body);
        console.log(response);

        if(response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      } catch(e) {
        console.error(e);
      }
    })();
  }, [params]);

  useEffect(() => {
    console.log(postInfo);
  }, [postInfo]);

  return (
    <div>
      {flag ? (
        <>
          {postInfo.title}
          {postInfo.content}
        </>
      ) : (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>
            Loading...
          </span>
        </Spinner>
      )}
      
    </div>
  );
};

export default Detail;