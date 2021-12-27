import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { RootState } from "../../store";
const cookies = new Cookies();
const key = process.env.NEXT_PUBLIC_API_KEY as string;
interface deleteKey {
  id: string;
  imgFileName: string;
}

export const fetchDeletePost = createAsyncThunk(
  "post/fetchDeletePost",
  async (deleteKey: deleteKey, { rejectWithValue }) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME as string);

    try {
      const isCreatePost = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELETE_POSTS_URL}?postId=${deleteKey.id}&fileName=${deleteKey.imgFileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            API_KEY: key,
          },
        }
      );
      if (isCreatePost?.data?.success) {
        alert("Your Post has been deleted successfully");
      }

      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePostSlice = createSlice({
  name: "post delete",
  initialState: {
    status: "",
    error: "",
  },

  reducers: {},
  extraReducers: {
    //
    [fetchDeletePost.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchDeletePost.fulfilled.type]: (state) => {
      state.status = "success";
    },
    [fetchDeletePost.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const deletePost = (state: RootState) => state.deletePost;

export default deletePostSlice.reducer;
