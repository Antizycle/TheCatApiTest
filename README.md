
Test Application to work with The Cat API (https://thecatapi.com/)

Goal: develop a simple app to learn how to use React Redux Toolkit, Axios in
      conjunction with TypeScript to get data through an API. And subsequently 
      manage and render that data with React.

What it does and how it works: 
   On first run, request Cat Data with Axios. While Data is requested show loading 
   indication (stored in the CatSlice). If any error occurs during data fetching 
   show it (error message is stored in the CatSlice).
   Generate Breed select tag options with Cat Breeds. Upon selecting a Cat Breed, 
   store it in the CatSlice and relevant Breed Data in a local variable.
   Pass Breed Data to CatData component to render some of it.
   Upon selecting the amount of Images to show, store the selected number in the CatSlice.
   On submitting a form request selected amount images for corresponding Breed. Received
   data is stored in the CatSlice.
   And subsequently rendered images in the Cat Data component.

Using: Node.Js; Webpack 5 (with SASS, min-css-extract-plugin, html-webpack-plugin,
       devserver), SASS, React, Typescript, React Redux Toolkit, Axios

Progress Log:
4. Styling and some refactoring.
   Everything is properly styled and fully responsive (with aim for a mobile-first
   approach).
   Data loading is now shown as animated gif inside of the Cat-form component.
   The Starting breed option is 'none' instead of 'all'. And all of the option tags
   have both a label attribute and a textContent with its value. 
   Cat-Data rendering happens in its own component.
   Changed how API calls check for a good response.

3. A bit of refactoring.
   CatForm is a separate component. That lead to moving imageList and isLoading
   from local state into castSlice (and creating corresponding reducer actions
   and types). And form related eventHandlers are now in the CatForm Component.
   Axios requests are mode via "theCatAPI" module with generalized async function
   which takes 'method' and 'endpoint' and returns an object with either a data or
   an error message (need to work on Types here).
   Next step: style everything properly.

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
   Render some data for the selected breed if any is selected.
   On button click: request selected amount of images from API via Axios and store
   received list in the local state.
   If anything is in the local state for imagesList, render images.

   Nothing is properly structured and styled. Main focus on getting everything
   to work. Need to work on typisation, modulation and styling.

1. Basic configuration for the development environment is done (yet going to find more 
   things to configure...).
   Boilerplate layout of the page and header is done.

Disclaimer. Main goal of this project is to learn how to use Redux and Typescript
in React applications. I am aware that current usage of Redux is quite an overkill
for the data I store in it and not optimal (not to mention same about using React):)
