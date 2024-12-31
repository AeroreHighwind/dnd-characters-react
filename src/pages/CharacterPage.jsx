import React, { useEffect, useState } from 'react';
import API from '../core/classes/api-base';
import  CharacterCard  from "../components/characters/CharacterCard";

export default function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.findAll('users');
      if (data) setCharacters(data);
    };

    const fetchImg = async() => {
      const images = await API.findAll('photos')
      if(images) setImages(images)
    }
    fetchData();
    fetchImg()
  }, []);

  return (

      <div>
        {characters.length ? (
          <ul className='flex flex-wrap flex-row max-w-screen-2xl m-auto gap-2 text-center'>
            {characters.map((character, index) => (
              <li key={'char-'+ index}>
                <CharacterCard character= {{...character, img:images[index]}} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

  );
}
