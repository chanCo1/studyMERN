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

  const getPostList = useCallback(() => {
    let body = {
      sort: sort,
      searchTerm: searchTerm,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/list', body);
        console.log(response);

        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [sort, searchTerm]);

  useEffect(() => {
    getPostList();
  }, [getPostList, sort]);

  const onChangeSearch = useCallback((e) => {
    setSearchTerm(e.currentTarget.value);
  }, []);

  const searchHandler = useCallback((e) => {
    // if(searchTerm === "") return;

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
    </div>
  );
});

export default MainPage;
