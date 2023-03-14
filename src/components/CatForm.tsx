import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { breedChanged, linksChanged, errorOccured, imagesChanged, 
         resetOccured, loadingStateChanged } from '../redux/catSlice';
import { BreedList} from './types/catsData';
import { GetData } from './api/theCatAPI';

type CatFormProps = {
  breedList: BreedList | null;
  breedId?: string;
}

export const CatForm = ({breedList, breedId}: CatFormProps) => {
  const breed = useAppSelector(state => state.cats.breed);
  const images = useAppSelector(state => state.cats.images);
  const error = useAppSelector(state => state.cats.error);
  const dispatch = useAppDispatch();

  const onBreedChangeHandler = (selectedBreed: string) => {
    dispatch(breedChanged(selectedBreed));
  }

  const onImagesChangeHandler = (imagesCount: number) => {
    dispatch(imagesChanged(imagesCount));
  }

  const imagesCountSelects = () => {
    const returnStr = [];
    for(let i = 1; i < 6 ; i++) {
      returnStr.push(<option key={i} value={i} label={i.toString()} />);
    }
    return returnStr;
  }

  const fetchImages = (id: string | undefined) => {
    if (breed === 'all') {
      dispatch(errorOccured('Please select a Breed'));
      return;
    }

    dispatch(loadingStateChanged(true));

    GetData('get', 'images/search?limit=' + images.toString() + '&breed_ids=' + id)
    .then(response => {
      dispatch(loadingStateChanged(false));
      if (response.error) throw Error(response.error);
      if (response.data) dispatch(linksChanged(response.data));
    })
    .catch(err => dispatch(errorOccured(err.message)));
  }

  const resetHandler = () => {
    dispatch(resetOccured());
  }

  return (
    <form>
      <label htmlFor='Cat Breed'>
        Select Cat Breed
      </label>
      <select name='Cat Breed' 
              value={breed} 
              onChange={(event) => onBreedChangeHandler(event.target.value)}
              className={'cat-form-select' + ((error === 'Please select a Breed') && ' cat-form-select--error')}
              >
        <option key='all' value='all'>
          {breed}
        </option>
        {breedList?.map(entry => (
          <option key={entry.id} value={entry.name} label={entry.name} />
        ))}
      </select>
      <select name='#Images to show' 
              value={images} 
              onChange={(event) => onImagesChangeHandler(Number(event.target.value) || 1)}
              >
        {imagesCountSelects()}
      </select>
      <button onClick={(e) => {
          e.preventDefault();
          fetchImages(breedId);
        }}>
        Show {images} images of {breed}
      </button>
      <button onClick={(e) => {
          e.preventDefault();
          resetHandler();
      }}>
        Reset Form
      </button>
    </form>
  );
}