import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  value: boolean
}

const initialState: AuthState = {
  value: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      state.value = false
    }
  }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer