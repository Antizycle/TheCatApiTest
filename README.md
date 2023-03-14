Test Application to work with The Cat API (https://thecatapi.com/)

Using: Node.Js; Webpack 5 (with SASS, min-css-extract-plugin, html-webpack-plugin,
       devserver); SASS, React, Typescript, React Redux Toolkit, Axios

Progress Log:
1. Basic configuration for development environment is done (yet going to find more 
   things to configure...).
   Boilerplate layout of the page and header is done.
2. Setup store and "catSlice" are done. Api calls through Axios for breed data and
   images. Rendering data.
   In redux store we have reducer for "catSlice" which contains state for cats
   (currently selected breed and amount of images, possible errors (for future
   development)). Reducer actions: breedChanged, imageChanged -- working; error
   and reset handling -- tbd.
   In "TestComponent" I import required methods, types, reducers and slices.
   Get the current state from the store for Cats.
   Get breedsList via Axios request from https://thecatapi.com and store it
   local state.
   Render Breed Select options with received data (if any data present): onChange
   set store state for breed (action type "breedChanged") and local state for 
   breedData with currently selected breed object from breedList.
   Render Images Select: onChange set store state for images (action type 
   "imagesChanged").
   Render some data for selected breed if any is selected.
   On button click: request selected amount of images from API via Axios and store
   received list in the local state.
   If anything is in the local state for imagesList, render images.

   Nothing is properly structured and styled. Main focus on getting everything
   to work. Need to work on typisation, modulation and styling.

Disclaimer. Main goal of this project is to learn how to use Redux and Typescript
in React applications. I am aware that current usage of Redux is quite an overkill
for the data I store in it and not optimal (not to mention same about using React):)