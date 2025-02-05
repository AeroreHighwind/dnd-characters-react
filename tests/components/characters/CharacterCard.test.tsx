import { render } from "@testing-library/react";
import CharacterCard from "../../../src/components/characters/CharacterCard";
import React from "react";
import { mockedCharacter } from "../../__mocks__/character.mock";

describe("Testing character card component", () => {
  let testCharacter;
  let containerRef;

  beforeEach(()=>{
     testCharacter = mockedCharacter
    const { container } = render(<CharacterCard character={testCharacter} />);
    containerRef = container;
  })

  // test("should match with snapshot", () => {
  //   expect(containerRef).toMatchSnapshot();
  // });

  test('should show the caracter name in a p element', () => { 
    const p = containerRef.querySelector('p')
    expect(p.innerHTML).toContain(testCharacter.name)
   })

   test('should default to unknown.png if character has no image url', () => { 
    const { container } = render(<CharacterCard character={{...testCharacter, imgUrl:undefined}} />);
    const img = container.querySelector('img')

    expect(img?.src).toContain('unknown.png')
   })
});