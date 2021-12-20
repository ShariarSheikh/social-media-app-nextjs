import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const searchArticle = createSlice({
  name: "add tags",
  initialState: {
    isSearch: false,
    searchBy: {
      name: "",
      tag: "",
    },
  },

  reducers: {
    searchByName: (state, action: PayloadAction<string>) => {
      state.searchBy.name = action.payload;
    },
    searchByTag: (state, action: PayloadAction<string>) => {
      state.searchBy.tag = action.payload;
    },
    searchHandler: (state, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload;
    },
  },
});

export const { searchByName, searchByTag,searchHandler } = searchArticle.actions;

export const searchArticleText = (state: RootState) => state.searchArticleText;

export default searchArticle.reducer;
