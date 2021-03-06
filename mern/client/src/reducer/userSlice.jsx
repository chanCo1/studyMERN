import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: '',
    uid: '',
    // firebase Rest API Data 통신을 위한 개인 인증 토큰
    // -> 로그인 할 때 마다 토큰의 값이 바뀌지는 않지만, 사용자의 로그인 여부를 추적하기 위해 사용
    accessToken: '',
    photoURL: '',
    isLoading: false,
  },
  reducers: {
    loginUser: (state, { payload }) => {
      return {
        displayName: payload.displayName,
        uid: payload.uid,
        accessToken: payload.accessToken,
        photoURL: payload.photoURL,
        isLoading: true,
      }
      // state.displayName =  payload.displayName;
      // state.uid = payload.uid;
      // state.accessToken = payload.accessToken;

    },

    clearUser: (state) => {
      return {
        displayName: '',
        uid: '',
        accessToken: '',
        photoURL: '',
        isLoading: true,
      }
      // state.displayName = '';
      // state.uid = '';
      // state.accessToken = '';
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;