import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import axios from 'axios';
import firebase from '../../firebase';

const MyPageDiv = styled.div`
  width: 100vw;
  height: 100vh;

  form {
    display: flex;
    width: 50%;
    margin: auto;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    input {
      display: none;
    }

    .avatar {
      border: 1px solid #c6c6c6;
      cursor: pointer;
    }
  }
`;

const Mypage = memo(() => {
  const { uid, accessToken, isLoading, photoURL } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState('');

  // 로그인 하지 않은 상태에서 url 접근시 로그인 페이지로 이동
  useEffect(() => {
    if (isLoading && !accessToken) {
      alert('로그인 해주세요');
      navigate('/login');
    } else {
      setCurrentImg(photoURL); 
    }
  }, [accessToken, isLoading, photoURL, navigate]);

  const ImageUpload = (e) => {
    console.log(e.target.files);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    (async () => {
      try {
        const response = await axios.post('/api/user/profile/img', formData);
        setCurrentImg(response.data.filePath);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  const SaveProfile = useCallback(async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: currentImg,
      });
    } catch(err) {
      console.error(err);
      return alert('프로필 저장에 실패하였습니다.');
    };

    let body = {
      photoURL: currentImg,
      uid: uid,
    };

    const response = await axios.post('/api/user/profile/update', body);

    if(response.data.success) {
      alert('프로필 저장에 성공하였습니다');
    } else {
      return alert('프로필 저장에 실패하였습니다');
    }
  }, [currentImg, uid]);

  return (
    <MyPageDiv>
      <form>
        <label htmlFor="">
          <input type="file" name="" id="" accept="image/*" onChange={ImageUpload} />
          <Avatar className="avatar" size="100" round={true} src={currentImg} />
        </label>
        <button onClick={SaveProfile}>저장</button>
      </form>
    </MyPageDiv>
  );
});

export default Mypage;
