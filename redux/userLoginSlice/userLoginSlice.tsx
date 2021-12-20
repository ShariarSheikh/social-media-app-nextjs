import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import router from "next/router";
import Cookies from "universal-cookie";
import { RootState } from "../store";
import { LogInRequestData, SignUpRequestData, State } from "./interface";
import axios from "axios";

const cookies = new Cookies();

export const singUpUser = createAsyncThunk(
  "user/singUpUser",
  async (user: SignUpRequestData, { rejectWithValue }) => {
    try {
      const newUser = await axios.post(
        "http://localhost:8000/auth/register",
        user
      );

      const { token } = newUser?.data?.data;
      cookies.set("uTn", token, { path: "/" });
      router.replace("/");

      return;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
/*
.
.
.
.
.
.
*/
export const loginUser = createAsyncThunk(
  "user/singUpUser",
  async (user: LogInRequestData, { rejectWithValue }) => {
    try {
      const newUser = await axios.post(
        "http://localhost:8000/auth/login",
        user
      );

      const { token } = newUser?.data?.data;
      cookies.set("uTn", token, { path: "/" });
      router.replace("/");
      return;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "join user",
  initialState: {
    status: null,
    error: null,
  },

  reducers: {
    logOut: () => {
      cookies.remove("uTn");
      router.reload();
    },
  },
  extraReducers: {
    [singUpUser.pending.type]: (state: State) => {
      state.status = "pending";
    },
    //
    [singUpUser.fulfilled.type]: (state: State) => {
      state.status = "success";
    },
    [singUpUser.rejected.type]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    [loginUser.pending.type]: (state: State) => {
      state.status = "pending";
    },
    //
    [loginUser.fulfilled.type]: (state: State) => {
      state.status = "success";
    },
    [loginUser.rejected.type]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { logOut } = userLoginSlice.actions;

export const isLoggedIn = (state: RootState) => state.isLoggedIn;

export default userLoginSlice.reducer;
