import { configureStore } from "@reduxjs/toolkit";
import addTagsSlice from "./addTagsSlice/addTagsSlice";
import searchArticle from "./searchArticle/searchArticle";
import userLoginSlice from "./userLoginSlice/userLoginSlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: userLoginSlice,
    selectedTags: addTagsSlice,
    searchArticleText: searchArticle,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
