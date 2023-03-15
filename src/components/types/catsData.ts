export type BreedData = { 
  name: string; 
  id: string; 
  adaptability: number;
  affection_level: number;
  alt_names: string;
  description: string;
  energy_level: number;
  hairless: number;
  intelligence: number;
  life_span: string;
  origin: string;
  rare: number;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  temperament: string;
};

export type CatImagesList = [
  {
    breeds: BreedData;
    url: string;
    id: string;
    width: number;
    height: number;
  }
];

export type BreedList = [ BreedData ];