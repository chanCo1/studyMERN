import React, { memo, useState, useEffect, useCallback } from 'react';
import List from './post/List';
import axios from 'axios';

import { DropdownButton, Dropdown } from 'react-bootstrap';

const MainPage = memo(() => {
  const [postList, setPostList] = useState([]);
  // 정렬
  const [sort, setSort] = useState('최신순');
  // 검색
  const [searchTerm, setSearchTerm] = useState("");
  // 불러오기
  const [skip, setSkip] = useState(0);

  const [loadMore, setLoadMore] = useState(true);

  const getLoadMore = useCallback(() => {
    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: skip,
    };

    // async await
    (async () => {
      try {
        const response = await axios.post('/api/post/list', body);

        if (response.data.success) {
          setPostList([...postList, ...response.data.postList]);
          setSkip(skip + response.data.postList.length);
          
          if(response.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [sort, searchTerm, skip, postList]);

  // 원본
  const getPostList = useCallback(() => {

    setSkip(0);

    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: 0,
    };

    // async await
    (async () => {
      try {
        const response = await axios.post('/api/post/list', body);

        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          
          if(response.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [sort, searchTerm]);

  useEffect(() => {
    getPostList();
  }, [sort]);

  const onChangeSearch = useCallback((e) => {
    setSearchTerm(e.currentTarget.value);
  }, []);

  const searchHandler = useCallback((e) => {
    getPostList();
  }, [getPostList]);



  return (
    <div>
      <DropdownButton variant="outline-secondary" title={sort}>
        <Dropdown.Item onClick={() => setSort("최신순")}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("인기순")}>인기순</Dropdown.Item>
      </DropdownButton>

      <input 
        type="text" 
        value={searchTerm} 
        onChange={onChangeSearch}
        onKeyDown={(e) => {
          if (e.keyCode === 13) searchHandler();
        }}
      />

      <List postList={postList} />

      {loadMore && <button onClick={getLoadMore}>더 불러오기</button>}
    </div>
  );
});

export default MainPage;
