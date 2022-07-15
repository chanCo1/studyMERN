import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import firebase from '../../firebase';
import LoginDiv from '../../style/UserCss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [flag, setFlag] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [nameInfo, setNameInfo] = useState('');

  const navigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();

    if (!(name && email && password && pwConfirm)) return alert('모든 값을 채워주세요!');

    if (password !== pwConfirm) return alert('비밀번호를 다시 확인해주세요.');

    if (!nameCheck) return alert('닉네임 중복검사를 진행해 주세요.');

    setFlag(true);

    const createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createUser.user.updateProfile({
      displayName: name,
    });

    console.log(createUser.user);

    const body = {
      email: createUser.user.multiFactor.user.email,
      displayName: createUser.user.multiFactor.user.displayName,
      uid: createUser.user.multiFactor.user.uid
    };

    try {
      const response = await axios.post('/api/user/register', body);
      console.log(response);

      setFlag(false);
  
      if(response.data.success) {
        navigate('/login');
      } else {
        return alert('회원가입이 실패하였습니다.');
      };
    } catch(e) {
      console.error(e);
    }
  };

  const NameCheckFunc = useCallback( async (e) => {
    e.preventDefault();

    if(!name) return alert('닉네임을 입력해주세요.');

    const body = {
      displayName: name,
    };

    try {
      const response = await axios.post('/api/user/namecheck', body);

      if(response.data.success) {
        if(response.data.check) {
          setNameCheck(true);
          setNameInfo('사용 가능한 닉네임 입니다.');
        } else {
          setNameInfo('사용 할 수 없는 닉네임 입니다.');
        }
      };

    } catch(err) {
      console.error(err);
    }
  }, [name]);

  return (
    <LoginDiv>
      <form action="">
        <label htmlFor="">닉네임</label>
        <input
          type="name"
          value={name.trim()}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        {nameInfo}
        <button onClick={NameCheckFunc}>닉네임 중복검사</button>

        <label htmlFor="">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          value={password}
          minLength={8}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="">비밀번호 확인</label>
        <input
          type="password"
          value={pwConfirm}
          minLength={8}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={RegisterFunc}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
