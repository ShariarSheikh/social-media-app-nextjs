import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { RootState } from "../../store";
const cookies = new Cookies();
const key = process.env.NEXT_PUBLIC_API_KEY as string;

export const uploadPost = createAsyncThunk(
  "post/uploadPost",
  async (post: FormData, { rejectWithValue }) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);

    try {
      const isCreatePost = await axios.post(
        process.env.NEXT_PUBLIC_CREATE_POSTS_URL as string,
        post,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            API_KEY: key,
          },
        }
      );
      if (isCreatePost?.data?.success) {
        alert("Your Post has been created successfully");
      }

      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPostSlice = createSlice({
  name: "post create",
  initialState: {
    isCreatePost: false,
    createPostData: {},
    status: "",
    error: "",
  },

  reducers: {
    openCreatePost: (state) => {
      state.isCreatePost = !state.isCreatePost;
    },
  },
  extraReducers: {
    [uploadPost.pending.type]: (state) => {
      state.status = "pending";
    },
    [uploadPost.fulfilled.type]: (state) => {
      state.status = "success";
      state.isCreatePost = !state.isCreatePost;
    },
    [uploadPost.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { openCreatePost } = createPostSlice.actions;

export const createPost = (state: RootState) => state.createPost;

export default createPostSlice.reducer;
