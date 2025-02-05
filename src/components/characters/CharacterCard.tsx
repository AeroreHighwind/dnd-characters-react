import React from 'react';
import { CharacterType } from "../../core/types/CharacterCardTypes";

export default function CharacterCard({ character }) {
  return (
    <div className='flex flex-col justify-center overflow-hidden max-w-md'>
      <p className='text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
        {character.name}
      </p>
      <div className='flex bg-gray-700 h-52 w-52 text-slate-950 justify-center items-center'>
        <img
          className='w-full h-full'
          src={character.imgUrl || "unknown.png"}
          alt="Character Portrait"
          // onError={(e) => {
          //   // @ts-ignore
          //   e.target.src = "unknown.png";
          // }}
        />
    </div>
      {/* <CharacterPortrait imgUrl={character.imgUrl} /> */}
      <div className='font-semibold'>
      <h1 className='font-sans'>Lvl: {character.lvl} / <span className='text-lg'>{character.class}</span></h1>
      <h2>Series: {character.series}</h2>
    </div>
    </div>
  );
}

CharacterCard.propTypes =  {
  character: CharacterType.isRequired,
};;

