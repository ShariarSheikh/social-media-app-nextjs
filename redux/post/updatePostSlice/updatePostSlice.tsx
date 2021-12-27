import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { RootState } from "../../store";
const cookies = new Cookies();
const key = process.env.NEXT_PUBLIC_API_KEY as string;

export const fetchUpdatePost = createAsyncThunk(
  "post/fetchUpdatePost",
  async (post: any, { rejectWithValue }) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);

    try {
      const isSuccessPost = await axios.patch(
        process.env.NEXT_PUBLIC_UPDATE_POSTS_URL as string,
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            API_KEY: key,
          },
        }
      );
      if (isSuccessPost?.data?.success) {
        alert("Your Post has been updated successfully");
      }

      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePostSlice = createSlice({
  name: "post update",
  initialState: {
    isUpdate: false,
    postData: {},
    status: "",
    error: "",
  },

  reducers: {
    openUpdatePost: (state, action) => {
      state.isUpdate = action.payload.open;
      state.postData = action.payload.postData;
    },
  },
  extraReducers: {
    [fetchUpdatePost.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchUpdatePost.fulfilled.type]: (state) => {
      state.status = "success";
      state.isUpdate = false;
    },
    [fetchUpdatePost.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { openUpdatePost } = updatePostSlice.actions;

export const updatePost = (state: RootState) => state.updatePost;

export default updatePostSlice.reducer;
