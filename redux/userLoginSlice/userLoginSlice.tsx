import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import router from "next/router";
import Cookies from "universal-cookie";
import { RootState } from "../store";
import { LogInRequestData, SignUpRequestData, State } from "./interface";
import axios from "axios";
import { storeUserCookies } from "../../utils/storeUserCookies";
const cookies = new Cookies();
const key = process.env.NEXT_PUBLIC_API_KEY as string;
const myToken = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);

const data =
  typeof window !== "undefined" &&
  cookies.get(process.env.NEXT_PUBLIC_USER as string)
    ? cookies.get(process.env.NEXT_PUBLIC_USER as string)
    : {};

export const singUpUser = createAsyncThunk(
  "user/singUpUser",
  async (user: SignUpRequestData, { rejectWithValue }) => {
    try {
      const newUser = await axios.post(
        process.env.NEXT_PUBLIC_REGISTER_URL as string,
        user,
        { headers: { API_KEY: key } }
      );

      const { token, name, email, profileImg, profileId, imgFileName } =
        newUser?.data?.data;

      const uProfile = {
        name,
        email,
        profileImg,
        profileId,
        imgFileName,
      };

      storeUserCookies(token, uProfile);
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
        process.env.NEXT_PUBLIC_LOGIN_URL as string,
        user,
        { headers: { API_KEY: key } }
      );

      const { token, name, email, profileImg, profileId, imgFileName } =
        newUser?.data?.data;

      const uProfile = {
        name,
        email,
        profileImg,
        profileId,
        imgFileName,
      };
      storeUserCookies(token, uProfile);
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
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id: string, { rejectWithValue }) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);

    try {
      const isDeleted = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELETE_ACCOUNT_URL}?id=${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            API_KEY: key,
          },
        }
      );

      if (isDeleted?.data?.success) {
        cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
        cookies.remove(process.env.NEXT_PUBLIC_USER as string);
        alert("Your Account Has Been Deleted");
        router.reload();
      }

      return;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// img profile img
export const profileImgUpdate = createAsyncThunk(
  "user/profileImgUpdate",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_VERCEL_UR_PROFILE_IMG as string,
        data,
        {
          headers: {
            Authorization: "Bearer " + myToken,
            API_KEY: key,
          },
        }
      );
      const { token, name, email, profileImg, profileId, imgFileName } =
        response?.data?.data;

      const uProfile = {
        name,
        email,
        profileImg,
        profileId,
        imgFileName,
      };
      storeUserCookies(token, uProfile);

      return;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "join user",
  initialState: {
    status: null,
    error: null,
    user: data,
    imgStatus: "",
    imgError: "",
  },

  reducers: {
    logOut: () => {
      cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
      cookies.remove(process.env.NEXT_PUBLIC_USER as string);
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
    //
    [deleteAccount.pending.type]: (state: State) => {
      state.status = "pending";
    },
    [deleteAccount.fulfilled.type]: (state: State) => {
      state.status = "success";
    },
    [deleteAccount.rejected.type]: (
      state: State,
      action: PayloadAction<string>
    ) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    //
    //upload profile image
    [profileImgUpdate.pending.type]: (state, action) => {
      state.imgStatus = "pending";
    },
    [profileImgUpdate.fulfilled.type]: (state, action) => {
      state.imgStatus = "success";
    },
    [profileImgUpdate.rejected.type]: (state, action) => {
      state.imgStatus = "rejected";
      state.imgError = action.payload;
    },
  },
});

export const { logOut } = userLoginSlice.actions;

export const isLoggedIn = (state: RootState) => state.isLoggedIn;

export default userLoginSlice.reducer;
