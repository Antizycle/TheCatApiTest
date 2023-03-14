import { createSlice } from '@reduxjs/toolkit'; 
import type { RootState } from './store';

// Define a type for the catSlice state
export type catState = {
  breed: string;
  images: number;
  error: boolean;
};

// export enum CatActionType {
//   breedChanged, imagesChanged, errorOccured, resetOccured
// };

type BreedChanged = {
  type: string;
  payload: string;
}

type ImagesChanged = {
  type: string;
  payload: number;
}

// Define the initial state using that type
const initialState: catState = {
  breed: 'all',
  images: 1,
  error: false
};

export const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    breedChanged: (state, action: BreedChanged) => {
      state.breed = action.payload;
    },
    imagesChanged: (state, action: ImagesChanged) => {
      state.images = action.payload;
    },
    errorOccured: (state, action) => {
      state.error = action.payload;
    },
    resetOccured: (state) => {
      state = initialState;
    },
  }
});

export const { breedChanged, imagesChanged, errorOccured } = catSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cats;

export default catSlice.reducer;