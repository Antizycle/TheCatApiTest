import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { breedChanged, linksChanged, errorOccured, imagesChanged, 
         resetOccured, loadingStateChanged } from '../redux/catSlice';
import { BreedList} from './types/catsData';
import { GetData } from './api/theCatAPI';
import loading from '../img/loading.gif'

type CatFormProps = {
  breedList: BreedList | null;
  breedId?: string;
}

export const CatForm = ({breedList, breedId}: CatFormProps) => {
  const breed = useAppSelector(state => state.cats.breed);
  const images = useAppSelector(state => state.cats.images);
  const error = useAppSelector(state => state.cats.error);
  const loadingState = useAppSelector(state => state.cats.loadingState);
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
      returnStr.push(<option key={i} value={i} label={i.toString()} >{i}</option>);
    }
    return returnStr;
  }

  const fetchImages = (id: string | undefined) => {
    if (breed === 'none') {
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
    <section className='cat-form'>
      <h2>The Cat Form</h2>
      {loadingState && 
        <div className='loading-msg'>
          <span>Loading...</span><br />
          <img src={loading} alt='loading...' />
          
        </div>}
      <form>
        <label htmlFor='Cat Breed' className='cat-form__label'>
          Select Cat Breed:
        </label>
        {(error === 'Please select a Breed') && <p className='cat-form__error'>{error}</p>}
        <select name='Cat Breed' 
                value={breed} 
                onChange={(event) => {
                    dispatch(errorOccured(''));
                    onBreedChangeHandler(event.target.value)
                  }}
                className={'cat-form__select ' + ((error === 'Please select a Breed') && ' cat-form__select--error')}
                >
          <option key='none' value='none'>
            {breed}
          </option>
          {breedList?.map(entry => (
            <option key={entry.id} value={entry.name} label={entry.name} >{entry.name}</option>
          ))}
        </select>
        <label htmlFor='#Images to show' className='cat-form__label'>
          Select number of images to show:
        </label>
        <select name='#Images to show' 
                value={images} 
                onChange={(event) => onImagesChangeHandler(Number(event.target.value) || 1)}
                className='cat-form__select' 
                >
          {imagesCountSelects()}
        </select>
        <button className='cat-form__button cat-form__button--submit' 
                onClick={(e) => {
                  e.preventDefault();
                  fetchImages(breedId);
                }}>
          Show {images} images of {breed}
        </button>
        <button className='cat-form__button cat-form__button--reset'
                onClick={(e) => {
                  e.preventDefault();
                  resetHandler();
                }}>
          Reset Form
        </button>
      </form>
    </section>
  );
}