import React, { memo } from 'react';

import { useSelector } from 'react-redux'

import RepleUpload from './RepleUpload';
import RepleList from './RepleList';

const RepleArea = memo(({ postId }) => {

  const { accessToken } = useSelector(state => state.user);

  return (
    <div>
      {accessToken && <RepleUpload postId={postId} />}
      <RepleList postId={postId} />
    </div>
  );
});

export default RepleArea;