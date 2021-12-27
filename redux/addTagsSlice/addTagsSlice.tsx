import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const tagData =
  typeof window !== "undefined" && localStorage.getItem("uTags")
    ? JSON.parse(localStorage.getItem("uTags") || "")
    : [];

export const addTagsSlice = createSlice({
  name: "add tags",
  initialState: {
    tags: tagData,
  },

  reducers: {
    addTags: (state, action) => {
      state.tags = action.payload;

      localStorage.setItem("uTags", JSON.stringify(state.tags));
    },
  },
});

export const { addTags } = addTagsSlice.actions;

export const selectedTags = (state: RootState) => state.selectedTags;

export default addTagsSlice.reducer;
