import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginDiv from '../../style/UserCss';
import firebase from '../../firebase.js';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  // 로그인 기능 구현
  const SignInFunc = async (e) => {
    e.preventDefault();

    if(!(email && password)) {
      return alert("모든 값을 채워주세요!!");
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/');
    } catch(error) {
      if(error.code === 'auth/user-not-found') {
        setErrorMsg('존재하지 않는 이메일입니다.');
      } else if(error.code === 'auth/wrong-password') {
        setErrorMsg('비밀번호가 일치하지 않습니다.');
      } else {
        setErrorMsg('로그인에 실패하였습니다.');
      }
    };
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  }, [errorMsg]);

  const onEmailChange = useCallback((e) => {
    e.preventDefault();

    setEmail(e.currentTarget.value);
  }, []);

  const onPassChange = useCallback((e) => {
    e.preventDefault();

    setpassword(e.currentTarget.value);
  }, []);

  const OnButtonClick = useCallback((e) => {
    e.preventDefault();

    navigate('/register');
  }, [navigate]);

  return (
    <LoginDiv>
      <form>
        <label htmlFor="">이메일</label>
        <input type="email" value={email} onChange={onEmailChange} />

        <label htmlFor="">비밀번호</label>
        <input type="password" value={password} onChange={onPassChange} />

        {errorMsg !== '' && <p>{errorMsg}</p>}
        
        <button onClick={SignInFunc}>로그인</button>
        <button onClick={OnButtonClick}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Login;