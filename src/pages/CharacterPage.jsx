import React, { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { HttpClient } from "../core/classes/http-client.class";
import { CharacterModel } from '../models/Character.model';


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

      const newChar = new CharacterModel()
      newChar.class = 'Vanguard'
      newChar.imgUrl = 'https://iopwiki.com/images/a/a9/Makiatto_S.png'
      newChar.lvl = 17;
      newChar.name = 'Makiatto'
      newChar.stats.str = 1
      newChar.stats.dex = 1
      newChar.stats.con = 1
      newChar.stats.int = 1
      newChar.stats.wis = 1
      newChar.stats.cha = 1
      newChar.ownerId = 'TEST'
      const newArray = [...data, newChar]
      setCharacters(newArray);

      // setCharacters()
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
//CharacterPage.propTypes = CharacterType
