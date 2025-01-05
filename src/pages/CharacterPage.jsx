import React, { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { CharacterModel } from '../models/Character.model';
import { FirestoreAPI } from "../core/classes/firestore.class";

export default function CharacterPage() {
  // @ts-ignore
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const model = CharacterModel
    
    const retrieveCharacters = async ()=>{
      const fireCharacters = await FirestoreAPI.findAll(model)
      if (fireCharacters) setCharacters(fireCharacters)
    }


    retrieveCharacters()
  }, []);

  return (
      <div>
        <img src="https://drive.usercontent.google.com/download?id=1gGjmerWFxRxqgfCSadjNicZXsnaEoQ4g&authuser=0" alt="" srcSet="" />
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
