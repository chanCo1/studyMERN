import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ImageUpload from './ImageUpload';
import { UploadDiv, UploadForm, UploadButtonDiv } from '../../style/UploadCSS';

const Edit = () => {

  const params = useParams();

  const [postInfo, setPostInfo] = useState({});
  // const [flag, setFlag] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  // 정보 가져오기
  useEffect(()=> {
    let body = {
      postNum: params.postNum,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/detail', body);
        console.log(response);

        if(response.data.success) {
          setPostInfo(response.data.post);
          // setFlag(true);
        }
      } catch(e) {
        console.error(e);
      }
    })();
  }, [params]);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) {
      return alert('모든 항목을 채워주세요!');
    };

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };

    (async () => {
      try {
        const response = await axios.post('/api/post/edit', body);
        console.log(response);

        if(response.data.success) {
          alert('글 수정이 완료 되었습니다.');
          navigate(`/post/${params.postNum}`);
        } else {
          alert('글 수정에 실패 하였습니다.');
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
  const onCancle = useCallback((e) => {
    e.preventDefault();
    navigate(-1);
  }, [navigate]);

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input 
          type="text" 
          id="title" 
          value={title || ''} 
          onChange={onChangeTitle} 
        />

        <ImageUpload  />

        <label htmlFor="content">내용</label>
        <textarea
          type="text" 
          id="title" 
          value={content || ''} 
          onChange={onChangeContent}
        />
        <UploadButtonDiv>
          <button onClick={onSubmit}>수정</button>
          <button className='cancle' onClick={onCancle}>취소</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Edit;