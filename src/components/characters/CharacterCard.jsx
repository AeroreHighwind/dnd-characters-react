import React from 'react';
import CharacterPortrait from './CharacterPortrait';
import CharacterStats from './CharacterStats';
import { CharacterType } from "../../core/types/CharacterCardTypes";

export default function CharacterCard({ character }) {
  return (
    <div className='flex flex-col justify-center overflow-hidden max-w-md'>
      <p className='text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
        {character.name}
      </p>
      <CharacterPortrait imgUrl={character.imgUrl} />
      <CharacterStats />
    </div>
  );
}

CharacterCard.propTypes =  {
  character: CharacterType.isRequired,
};;

