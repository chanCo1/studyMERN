import React, { useCallback, useState } from 'react';
import './App.css';

function App() {

  const [content, setContent] = useState('');

  const onSubmit = (e) => {
    alert(content);
    setContent('');
  }

  const onChange = (e) => {
    e.preventDefault();
    setContent(e.currentTarget.value);
  }

  return (
    <div className="App">
      <input type='text' value={content} onChange={onChange} />
      <button onClick={onSubmit}>ㅋ</button>
    </div>
  );
}

export default App;
