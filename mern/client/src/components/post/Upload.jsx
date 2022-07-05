import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UploadDiv, UploadForm, UploadButtonDiv } from '../../style/UploadCSS';
import ImageUpload from './ImageUpload';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) {
      return alert('모든 항목을 채워주세요!');
    };

    let body = {
      title: title,
      content: content,
      image: img
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/submit', body);
        console.log(response.data);

        if(response.data.success) {
          alert('글 작성이 완료 되었습니다.');
          navigate('/');
        } else {
          alert('글 작성에 실패 하였습니다.');
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  const onChangeTitle = useCallback((e) => {
    setTitle(e.currentTarget.value)
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.currentTarget.value)
  }, []);

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={onChangeTitle} 
        />

        <ImageUpload setImg={setImg} />

        <label htmlFor="content">내용</label>
        <textarea
          type="text" 
          id="title" 
          value={content} 
          onChange={onChangeContent}
        />
        <UploadButtonDiv>
          <button onClick={onSubmit}>제출!</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Upload;
