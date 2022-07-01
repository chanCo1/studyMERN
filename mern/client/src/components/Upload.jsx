import React, { useState } from 'react';
import styled from 'styled-components';

const InputArea = styled.div`
  & {
    text-align: center;
  }
`;

const Upload = ({ contentList, setContentList }) => {

  const [content, setContent] = useState('');

  const onSubmit = () => {
    let tempArr = [...contentList];
    tempArr.push(content);
    setContentList([...tempArr]);
    setContent('');
  }

  const onChange = (e) => {
    setContent(e.currentTarget.value);
  }

  return (
    <InputArea>
      <input type="text" value={content} onChange={onChange} />
      <button onClick={onSubmit}>제출</button>
    </InputArea>
  );
};

export default Upload;