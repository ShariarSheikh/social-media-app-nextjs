import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { RootState } from "../../store";
const cookies = new Cookies();
const key = process.env.NEXT_PUBLIC_API_KEY as string;

export const fetchMyPost = createAsyncThunk(
  "post/fetchMyPost",
  async (_, { rejectWithValue }) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
    const user = cookies.get(process.env.NEXT_PUBLIC_USER as string);

    try {
      const post = await axios.get(
        `${process.env.NEXT_PUBLIC_GET_MY_POSTS_URL}?posterId=${user?.profileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            API_KEY: key,
          },
        }
      );
      const data = post?.data?.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMyPostSlice = createSlice({
  name: "my post",
  initialState: {
    status: "",
    error: "",
    allPost: [],
  },

  reducers: {},
  extraReducers: {
    //
    [fetchMyPost.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchMyPost.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.allPost = action.payload;
    },
    [fetchMyPost.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const getMyPost = (state: RootState) => state.getMyPost;

export default getMyPostSlice.reducer;
