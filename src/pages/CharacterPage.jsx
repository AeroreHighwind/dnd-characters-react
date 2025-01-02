import React, { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { HttpClient } from "../core/classes/http-client.class";
import { CharacterModel } from '../models/Character.model';

export default function CharacterPage() {
  // @ts-ignore
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
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
    setCharacters([newChar]);
  }, []);

  return (

      <div>
        {characters.length ? (
          <ul className='flex flex-wrap flex-row max-w-screen-2xl m-auto gap-2 text-center'>
            {characters.map((character, index) => (
              <li key={'char-'+ index}>
                <CharacterCard character= {{...character}} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
  );
}
