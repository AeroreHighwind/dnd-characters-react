import { EntityModel } from "../core/classes/entity-model.class";
import { Collection } from "../core/decorators/Collection.decorator";

export class CharacterModel extends EntityModel {
  name = "";
  class = "";
  race = "";
  lvl = 1;
  ownerId = "";
  imgUrl = "";
  series = "";
  stats = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };

  constructor() {
    super();
    Collection("characters")(this);
  }
}
