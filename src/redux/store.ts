import { configureStore } from '@reduxjs/toolkit';
import catReducer from './catSlice';

export const store = configureStore({
  reducer: {
    cats: catReducer, // stateName: reducer function for that state
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;