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

  const navigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();

    if (!(name && email && password && pwConfirm)) {
      return alert('모든 값을 채워주세요!');
    }

    if (password !== pwConfirm) {
      return alert('비밀번호가 다릅니다.');
    }

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

  return (
    <LoginDiv>
      <form action="">
        <label htmlFor="">이름</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
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
