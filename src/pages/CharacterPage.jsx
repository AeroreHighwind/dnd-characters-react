import React, { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { HttpClient } from "../core/classes/http-client.class";

export default function CharacterPage() {
  // @ts-ignore
  const baseURL = import.meta.env.VITE_GATEWAY_URL;
  const http = new HttpClient(baseURL)

  const [characters, setCharacters] = useState([]);
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await http.get('users');
      if (data) setCharacters(data);
    };

    const fetchImg = async() => {
      const images = await http.get('photos')
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
