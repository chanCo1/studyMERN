import React, { useCallback, useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UploadDiv, UploadForm, UploadButtonDiv } from '../../style/UploadCSS';
import ImageUpload from './ImageUpload';

const Upload = memo(() => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');

  // 리덕스의 로그인 정보 가져오기
  const { uid, accessToken } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if(!accessToken) {
      alert('로그인 해주세요');
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // 글작성 버튼 클릭시
  const onSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) {
      return alert('모든 항목을 채워주세요!');
    };

    let body = {
      title: title,
      content: content,
      image: img,
      uid: uid
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/submit', body);

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
          <button onClick={onSubmit}>작성</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
});

export default Upload;
