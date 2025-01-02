import React, { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { CharacterModel } from '../models/Character.model';
import { FirestoreAPI } from "../core/classes/firestore.class";

export default function CharacterPage() {
  // @ts-ignore
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const newChar = new CharacterModel()
    
    newChar.class = 'Vanguard'
    newChar.imgUrl = 'https://iopwiki.com/images/a/a9/Makiatto_S.png'
    newChar.lvl = 17;
    newChar.name = 'Makiatto'
    newChar.stats.str = 10
    newChar.stats.dex = 10
    newChar.stats.con = 10
    newChar.stats.int = 10
    newChar.stats.wis = 10
    newChar.stats.cha = 10
    newChar.ownerId = 'TEST'
    
    const uploadCharacter = async ()=>{
      console.log("method executed");
      
      await FirestoreAPI.create(newChar)
    }
    const retrieveCharacters = async ()=>{
      const fireCharacters = await FirestoreAPI.findAll(newChar)
      if (fireCharacters) setCharacters(fireCharacters)
    }

    // uploadCharacter()
    retrieveCharacters()
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
