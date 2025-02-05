export class BaseModel {
  static readonly collectionName: string;
  id?: string;

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
    // @ts-ignore
    return this.constructor.getCollectionName();
  }
}
