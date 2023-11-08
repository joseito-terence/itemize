import { configureStore } from '@reduxjs/toolkit';
import storageReducer from './storageSlice';
import itemReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    storages: storageReducer,
    items: itemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
