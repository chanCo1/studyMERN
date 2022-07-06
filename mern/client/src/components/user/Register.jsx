import React, { useState, useCallback } from 'react';

import firebase from '../../firebase';

import LoginDiv from '../../style/UserCss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const RegisterFunc = async (e) => {
    e.preventDefault();

    if (!(name && email && password && pwConfirm)) {
      return alert('모든 값을 채워주세요!');
    }

    if (password !== pwConfirm) {
      return alert('비밀번호가 다릅니다.');
    }

    const createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createUser.user.updateProfile({
      displayName: name,
    });

    console.log(createUser.user);
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
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="">비밀번호 확인</label>
        <input
          type="password"
          value={pwConfirm}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button onClick={RegisterFunc}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
