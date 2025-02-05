import  { useEffect, useState } from 'react';
import  CharacterCard  from "../components/characters/CharacterCard";
import { CharacterModel } from '../models/Character.model';
import { FirestoreAPI } from "../core/classes/firestore.class";

const model = CharacterModel

export default function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    
    const retrieveCharacters = async ()=>{
      const fireCharacters = await FirestoreAPI.findAll(model)
  
      // @ts-ignore
      if (fireCharacters) setCharacters(fireCharacters)
    }

    retrieveCharacters()
  }, []);

  return (
      <>
        {characters.length ? (
          <ul className='flex flex-wrap flex-row max-w-screen-2xl m-auto gap-2 text-center'>
            {characters.map((character, index) => (
              <li key={'char-'+ index}>
                <CharacterCard character= {{

                // @ts-ignore
                ...character}} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </>
  );
}
