import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

export default function CharacterPortrait({ imgUrl }) {
  const thumbnailUrl = imgUrl || "https://via.placeholder.com/150";
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(thumbnailUrl);

  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target) setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageClick() {
    // @ts-ignore
    fileInputRef.current.click();
  }

  return (
    <div className='flex bg-gray-700 h-52 w-52 text-slate-950 justify-center items-center'>
      <button
        onClick={handleImageClick}
        className='w-full h-full cursor-pointer hover:opacity-80 transition-all ease-in-out p-0 border-none bg-transparent'
        aria-label="Upload Character Image"
      >
        <img
          className='w-full h-full'
          src={imageSrc}
          alt="Character Portrait"
          onError={(e) => {
            // @ts-ignore
            e.target.src = "unknown.png";
          }}
        />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={uploadFile} 
        accept="image/*"
      />
    </div>
  );
}
CharacterPortrait.propTypes = {
  imgUrl: PropTypes.string
}