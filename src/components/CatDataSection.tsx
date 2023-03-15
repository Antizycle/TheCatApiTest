import React from 'react';
import { BreedData } from "./types/catsData";
import { useAppSelector } from '../redux/hooks';

type CatDataProps = {
  breedData: BreedData | undefined;
}

export const CatDataSection = ({breedData}: CatDataProps) => {
  const imagesLinks = useAppSelector(state => state.cats.imagesLinks);
  const breedChars = [];

  // Getting data for cat-characterics to render
  // placeholder until I figure out a way to do it better
  if (breedData) {
    breedChars.push({name: 'Adaptability', value: breedData.adaptability});
    breedChars.push({name: 'Affection', value: breedData.affection_level});
    breedChars.push({name: 'Intelligence', value: breedData.intelligence});
    breedChars.push({name: 'Energy', value: breedData.energy_level});
    breedChars.push({name: 'Social Needs', value: breedData.social_needs});
    breedChars.push({name: 'Stranger riendly', value: breedData.stranger_friendly});
  }

  return (
    <>
      {breedData &&
        <section className="cat-data">
          <div className='cat-data__name'>
            <h2>{breedData.name}</h2>
            <p><b>Origin</b>: {breedData.origin}</p>
            <p><b>Life span</b>: {breedData.life_span}</p>
          </div>
          <div className='cat-data__chars'>
            {breedChars?.map( char => 
              <p key={char.name}>{char.name}: &nbsp;
                <span className='cat-data__characteristic-box'>
                  <span className="cat-data__characteristic-level"
                      style={{width: (char.value * 20)+'%'}} >
                    {char.value} / 5
                  </span>
                </span>
              </p>
            )}
          </div>
          <p className='cat-data__desc'>{breedData.description}</p>
          

          <div className='cat-data__images'>
          {imagesLinks?.map(image => (
            <img src={image.url} alt={breedData.name} key={image.id}/>
          ))}
          </div>
        </section>
        }
      </>
  );
}