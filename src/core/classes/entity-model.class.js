export class EntityModel {
  static collectionName;

  static getCollectionName() {
    if (!this.collectionName) {
      throw new Error(
        `Collection name must be defined in the subclass: ${this.name}`
      );
    }
    return this.collectionName;
  }

  getCollectionName() {
    // Call the static method from the constructor of the instance
    return this.constructor.getCollectionName();
  }
}
