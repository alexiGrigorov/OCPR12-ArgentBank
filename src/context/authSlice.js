import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/API";

import { fetchProfile } from "./profileSlice";

const initialState = {
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const token = await API.login(credentials);
      thunkAPI.dispatch(authSlice.actions.setToken(token));
      await thunkAPI.dispatch(fetchProfile());
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
