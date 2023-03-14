import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { errorOccured, loadingStateChanged } from '../redux/catSlice';
import { BreedList } from './types/catsData';
import { CatForm } from "./CatForm";
import { GetData } from './api/theCatAPI';

export const CatComp = () => {
  const breed = useAppSelector(state => state.cats.breed);
  const error = useAppSelector(state => state.cats.error);
  const imagesLinks = useAppSelector(state => state.cats.imagesLinks);
  const loadingState = useAppSelector(state => state.cats.loadingState);
  const [ breedList, setBreedList ] = useState<BreedList | null>(null);
  const dispatch = useAppDispatch();

  const breedData = breedList?.find(entry => entry.name === breed);

  useEffect( () => {
    dispatch(loadingStateChanged(true));

    GetData('get', 'breeds/')
    .then(response => {
      dispatch(loadingStateChanged(false));
      if (response.error) throw Error(response.error);
      if (response.data) setBreedList(response.data);
    })
    .catch(err => dispatch(errorOccured(err.message)));
  }, []);

  return (
    <div>
      {error && <div className='error-msg'>{error}</div>}
      <CatForm breedList={breedList} breedId={breedData?.id}/>
      <br />
      {loadingState && <h1>Data is loading</h1>}
      {breedData && <div>
        {/* data render in seperate component eventually */}
        {breedData.name}<br />
        {breedData.description}<br />
        {breedData.life_span}<br />
        {breedData.origin}<br />
        </div>}
        {imagesLinks?.map(image => (
          <img src={image.url} alt={image.breeds.description} key={image.id}/>
        ))}
    </div>
  );
}