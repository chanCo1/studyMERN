import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Heading from './components/Heading';
import List from './components/List';
import Upload from './components/Upload';

function App() {

  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />

      <Routes>
        <Route path='/' exact />
        <Route path='/list' element={
          <List contentList={contentList} setContentList={setContentList} />
          } 
        />
        <Route path='/upload' element={
          <Upload contentList={contentList} setContentList={setContentList} />} 
        />
      </Routes>
    </>
  );
}

export default App;
