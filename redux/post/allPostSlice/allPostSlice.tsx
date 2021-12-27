import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
const key = process.env.NEXT_PUBLIC_API_KEY as string;

export const fetchAllPost = createAsyncThunk(
  "post/fetchAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const getAll = await axios.get(
        process.env.NEXT_PUBLIC_GET_ALL_POSTS_URL as string,
        {
          headers: { API_KEY: key },
        }
      );
      const data = getAll?.data?.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const allPostSlice = createSlice({
  name: "all post",
  initialState: {
    status: "",
    error: "",
    allPost: [],
  },

  reducers: {},
  extraReducers: {
    [fetchAllPost.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchAllPost.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.allPost = action.payload;
    },
    [fetchAllPost.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const getAllPosts = (state: RootState) => state.getAllPosts;

export default allPostSlice.reducer;
