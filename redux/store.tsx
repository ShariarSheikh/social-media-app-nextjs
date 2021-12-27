import { configureStore } from "@reduxjs/toolkit";
import addTagsSlice from "./addTagsSlice/addTagsSlice";
import allPostSlice, { fetchAllPost } from "./post/allPostSlice/allPostSlice";
import createPostSlice from "./post/createPostSlice/createPostSlice";
import deletePostSlice from "./post/deletePostSlice/deletePostSlice";
import getMyPostSlice from "./post/getMyPostSlice/getMyPostSlice";
import updatePostSlice from "./post/updatePostSlice/updatePostSlice";
import userLoginSlice from "./userLoginSlice/userLoginSlice";

export const store = configureStore({
  reducer: {
    //post actions start --->
    createPost: createPostSlice,
    getMyPost: getMyPostSlice,
    getAllPosts: allPostSlice,
    deletePost: deletePostSlice,
    updatePost: updatePostSlice,
    //post actions end --->
    isLoggedIn: userLoginSlice,
    selectedTags: addTagsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//
store.dispatch(fetchAllPost());
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
