import React, { JSXElementConstructor, useEffect, useState } from 'react'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { breedChanged, imagesChanged } from '../redux/catSlice';
import { BreedList, BreedData } from './types/catsData';

type ImagesList = [
  {
    breeds: BreedData;
    url: string;
    id: string;
    width: number;
    height: number;
  }
];

export const TestComp = () => {
  const breed = useAppSelector(state => state.cats.breed);
  const images = useAppSelector(state => state.cats.images);
  const [ breedList, setBreedList ] = useState<BreedList | null>(null);
  const [ breedData, setBreedData ] = useState<BreedData | undefined>();
  const [ imagesList, setImagesList ] = useState<ImagesList | null>(null);
  const dispatch = useAppDispatch();

  // on first run only (currently no dependencies) useEffect executed axios fetch to get breed list
  // if any depened. is provided useEff will run on that dependency change

  useEffect( () => {
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/breeds/',
      headers: { 'content-type': 'application/json', "x-api-key": "live_CbOzwSeSxfA4oToyHbPPbHrTdupCpUEN9ch05Vs7v45mpuYxP3U4Z3zn2iN8GrTs" },
    })
    .then((response) => {
      console.log(response);
      if (response.statusText === 'OK') {
        setBreedList(response.data);
      } else {
        throw Error('Could not fetch data...');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }, []);

  const onBreedChangeHandler = (selectedBreed: string) => {
    dispatch(breedChanged(selectedBreed));
    
    const nextBreedData = breedList?.find(entry => entry.name === selectedBreed)
    if (nextBreedData) setBreedData(nextBreedData);
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

  const fetchImages = () => {
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search?limit=' + images.toString() + '&breed_ids=' + breedData?.id,
      headers: { 'content-type': 'application/json', "x-api-key": "live_CbOzwSeSxfA4oToyHbPPbHrTdupCpUEN9ch05Vs7v45mpuYxP3U4Z3zn2iN8GrTs" },
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        console.log(response.data);
        setImagesList(response.data);
      } else {
        throw Error('Could not fetch images...');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  return (
    <div>
      <label htmlFor='Cat Breed'>Select Cat Breed</label>
      <select name='Cat Breed' value={breed} onChange={(event) => onBreedChangeHandler(event.target.value)}>
        <option key='all' value='all'>{breed}</option>
        {breedList?.map(entry => (
          <option key={entry.id} value={entry.name} label={entry.name} />
        ))}
      </select>
      <select name='Number of Images to show' value={images} onChange={(event) => onImagesChangeHandler(Number(event.target.value) || 1)}>
        {imagesCountSelects()}
      </select>
      <button onClick={fetchImages}>Show {images} images of {breed}</button>
      <br />
      {breedData && <div>
        {breedData.name}<br />
        {breedData.description}<br />
        {breedData.life_span}<br />
        {breedData.origin}<br />
        </div>}
        {imagesList?.map(image => (
          <img src={image.url} alt={image.breeds.description} key={image.id}/>
        ))}
    </div>
  );
}