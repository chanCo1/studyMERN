import React, { memo, useState, useEffect } from 'react';
import List from './post/List';
import axios from 'axios';

const MainPage = memo(() => {

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
    <div>
      <div>
        <input type="text"/>
        <button></button>
      </div>

      <List postList={postList} />
    </div>
  );
});

export default MainPage;