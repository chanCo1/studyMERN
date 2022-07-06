import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginDiv from '../../style/UserCss';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

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
        <button>로그인</button>
        <button onClick={OnButtonClick}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Login;