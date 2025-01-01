import React from 'react';
import CharacterPortrait from './CharacterPortrait';
import CharacterStats from './CharacterStats';
import { CharacterType } from "../../core/types/CharacterCardTypes";

export default function CharacterCard({ character }) {
  return (
    <div className='flex flex-col justify-center overflow-hidden max-w-md'> {/* Use valid Tailwind class */}
      <p className='text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
        {character.name}
      </p>
      <CharacterPortrait characterImg={character.img} />
      <CharacterStats />
    </div>
  );
}

CharacterCard.propTypes = CharacterType;

