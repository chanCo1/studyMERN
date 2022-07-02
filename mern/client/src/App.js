import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Heading from './components/Heading';
import List from './components/post/List';
import Upload from './components/post/Upload';
import Detail from './components/post/Detail';

function App() {
  return (
    <>
      <Heading />

      <Routes>
        {/* <Route path='/' exact /> */}
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
