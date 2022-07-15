import React, { memo, useState, useCallback } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

const RepleUpload = memo(({ postId }) => {

  const [reple, setReple] = useState('');

  const { uid } = useSelector((state) => state.user);

  const onRepleChange = useCallback((e) => {
    setReple(e.currentTarget.value);
  }, []);

  const submitHandler = useCallback((e) => {
    e.preventDefault();

    if(!reple) {
      return alert('댓글 내용을 입력해주세요');
    };

    let body = {
      reple: reple,
      uid: uid,
      postId: postId,
    };

    (async () => {
      try {
        const response = await axios.post('/api/reple/submit', body);
        setReple('');

        if(response.data.success) {
          alert('댓글 작성이 성공하였습니다.');
        } else {
          alert('댓글 작성 실패');
        }
      } catch(err) {
        console.error(err);
      }
    })();

  }, [reple, uid, postId]);

  return (
    <div>
      <input type="text" value={reple} onChange={onRepleChange} placeholder={'댓글을 입력해주세요'} />
      <button onClick={submitHandler}>등록</button>
    </div>
  );
});

export default RepleUpload;