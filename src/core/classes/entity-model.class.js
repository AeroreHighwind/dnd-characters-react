/**
 * Base class representing an entity mappable to a Firestore collection.
 */
export class EntityModel {
  /**
   * @readonly
   * Name of the firestore collection this entity belongs to, will be used to perform CRUD operations.
   * Subclasses or decorators should assign this value, it shall never be reassigned.
   */
  collectionName;
  /**
   * Returns the collection name set by the Collection function.
   * @returns {string} The Firestore collection name.
   * @throws {Error} If the collection name is not defined.
   */

  /**
   * Returns the collection name set by the Collection function.
   * @returns {string} The Firestore collection name.
   * @throws {Error} If the collection name is not defined.
   */
  getModelName() {
    if (!this.collectionName)
      throw new Error(`Modelname must be defined in children classes`);
    return this.collectionName;
  }
}
