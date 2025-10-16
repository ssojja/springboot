import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogIn : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // state : initialState 객체
    // action : 컴포넌트에서 오는 값
    logIn(state, action) {
        state.isLogIn = !state.isLogIn;
        const { userId } = action.payload;
        const logInInfo = {
            "userId" : userId,
            "token" : "dkfj1238864"
        }
        localStorage.setItem("logInInfo", JSON.stringify(logInInfo));
    },
    logOut(state, action) {
        state.isLogIn = !state.isLogIn;
        localStorage.removeItem('logInInfo');
    }
  },
})

export const { logIn, logOut } 
            = authSlice.actions   //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default authSlice.reducer  //store import