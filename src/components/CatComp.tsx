import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { errorOccured, loadingStateChanged } from '../redux/catSlice';
import { BreedList } from './types/catsData';
import { CatForm } from "./CatForm";
import { CatDataSection } from './CatDataSection';
import { GetData } from './api/theCatAPI';

export const CatComp = () => {
  const breed = useAppSelector(state => state.cats.breed);
  const error = useAppSelector(state => state.cats.error);

  const [ breedList, setBreedList ] = useState<BreedList | null>(null);
  const dispatch = useAppDispatch();

  const breedData = breedList?.find(entry => entry.name === breed);

  // on first render get data from API (probalby shoyld be done with
  // just an if)...
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
    <main className='main'>
      {error && <div className='error-msg'>{error}</div>}
      <CatForm breedList={breedList} breedId={breedData?.id}/>
      <CatDataSection breedData={breedData} />
    </main>
  );
}