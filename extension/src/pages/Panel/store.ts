import { configureStore } from '@reduxjs/toolkit';
import highlightedComponentReducer from './slices/highlightedComponentSlice';
import currentSnapshotReducer from './slices/currentSnapshotSlice';
import treeHistoryReducer from './slices/treeHistorySlice';
import timedEventReducer from './slices/timedEventsSlice';

export const store = configureStore({
  reducer: {
    highlightedComponent: highlightedComponentReducer,
    currentSnapshot: currentSnapshotReducer,
    treeHistory: treeHistoryReducer,
    timedEvents: timedEventReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
