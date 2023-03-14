import axios from 'axios';
import { BreedList, CatImagesList } from '../types/catsData';
//: Promise<{ data?: BreedList | CatImagesList, error?: string }>

export const GetData = async (method: 'post' | 'get', endpoint: string) => {
  let data: BreedList | CatImagesList | undefined = undefined;
  let error: string | undefined = undefined;

  const url = 'https://api.thecatapi.com/v1/' + endpoint;

  await axios({
    method: method,
    url: url,
    headers: { 'content-type': 'application/json', "x-api-key": "live_CbOzwSeSxfA4oToyHbPPbHrTdupCpUEN9ch05Vs7v45mpuYxP3U4Z3zn2iN8GrTs" },
  })
  .then((response) => {
    if (response.statusText === 'OK') {
      data = response.data;
      return data;
    } else {
      throw Error('Could not fetch data...');
    }
  })
  .catch(err => {
    error = err.message;
    return error;
  });

  return {data, error};
}