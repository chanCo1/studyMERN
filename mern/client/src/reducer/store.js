import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
  },

  // redux-toolkit 같은 경우 비 직렬화 데이터를 보내는걸 싫어해서 에러가 난다.
  // 심한 에러는 아니지만, 무시하기 위한 아래 코드, 에러 해결은 아니다..
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});