import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Heading from './components/Heading';
import List from './components/post/List';
import Upload from './components/post/Upload';
import Detail from './components/post/Detail';
import Edit from './components/post/Edit';

function App() {
  return (
    <>
      <Heading />

      <Routes>
        {/* <Route path='/' exact /> */}
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
