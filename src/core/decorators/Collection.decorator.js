/**
 * Simulates a decorator by attaching metadata to the class.
 * @param {string} collectionName - The Firestore collection name.
 * @returns {Function} A function that modifies the class.
 */
export function Collection(collectionName) {
  return function (target) {
    target.collectionName = collectionName;
  };
}
