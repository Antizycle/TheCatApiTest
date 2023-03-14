import { createSlice } from '@reduxjs/toolkit'; 
import type { RootState } from './store';
import { CatImagesList } from '../components/types/catsData';

// Define a type for the catSlice state
export type catState = {
  breed: string;
  images: number;
  imagesLinks: CatImagesList | null;
  loadingState: boolean;
  error: string;
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

type LinksChanged = {
  type: string;
  payload: CatImagesList;
};

type LoadingStateChanged = {
  type: string;
  payload: boolean;
}

type ErrorOccured = {
  type: string;
  payload: string;
}

type ResetOccured = {
  type: string;
  payload?: boolean;
}

// Define the initial state using that type
const initialState: catState = {
  breed: 'all',
  images: 1,
  imagesLinks: null,
  loadingState: false,
  error: '',
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
    linksChanged: (state, action: LinksChanged) => {
      state.imagesLinks = action.payload;
    },
    loadingStateChanged: (state, action: LoadingStateChanged) => {
      state.loadingState = action.payload;
    },
    errorOccured: (state, action: ErrorOccured) => {
      state.error = action.payload;
    },
    resetOccured: (state, action: ResetOccured) => {
      // figure out state object in reducers. Something to do how Immer does it magic

      state.breed = 'all';
      state.images = 1;
      state.error = '';
      state.imagesLinks = null;
      state.loadingState = false;
    },
  }
});

export const { breedChanged, imagesChanged, linksChanged, loadingStateChanged, errorOccured, resetOccured } = catSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cats;

export default catSlice.reducer;