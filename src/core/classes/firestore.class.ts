import { firestore } from "../config/firebase.connection";
import { isSubclassOf } from "../utils/isSubclassOf";
import { BaseModel } from "./base-model.class";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";



const _firestore = firestore;

export class FirestoreAPI {
  /**
   * Creates a new document in Firestore.
   * @param {BaseModel} model - Entity model class
   * @returns {Promise<DocumentReference>}
   */
  static async create(model: BaseModel) {
    if (!(model instanceof BaseModel)) {
      throw new Error("model must be an instance of BaseModel");
    }
    const collectionRef = collection(_firestore, model.getCollectionName());
    const { ...rest } = model;
    return await addDoc(collectionRef, rest);
  }

  /**
   * Updates a document in Firestore.
   * @param {BaseModel} model - Entity model class
   * @param {string} elementId - Document ID
   * @returns {Promise<void>}
   */
  static async update(model: BaseModel, elementId: string) {
    if (!(model instanceof BaseModel)) {
      throw new Error("model must inherit from BaseModel");
    }
    if (!elementId) throw new Error("id of entity to update is required");

    const { id, getCollectionName, ...rest } = model;
    const docRef = doc(_firestore, `${model.getCollectionName()}/${elementId}`);
    return await updateDoc(docRef, rest);
  }

  /**
   * Finds a single document by ID.
   * @param {BaseModel} model - Entity model class
   * @param {string} id - Document ID
   * @returns {Promise<DocumentSnapshot>}
   */
  static async findOne(model: BaseModel, id: string) {
    if (!isSubclassOf(model, BaseModel)) {
      throw new Error("model must inherit from BaseModel");
    }
    const docRef = doc(_firestore, `${model.getCollectionName()}/${id}`);
    return await getDoc(docRef);
  }

  /**
   * Finds all documents by user ID.
   * @param {BaseModel} model - Entity model class
   * @param {string} userId - User ID
   * @returns {Promise<QuerySnapshot>}
   */
  static async findAllByUserId(model: BaseModel, userId: string) {
    if (!isSubclassOf(model, BaseModel)) {
      throw new Error("model must inherit from BaseModel");
    }
    const collectionRef = collection(_firestore, model.getCollectionName());
    const findAllQuery = query(collectionRef, where("userId", "==", userId));
    return await getDocs(findAllQuery);
  }

  /**
   * Finds all documents in collection
   * @param {BaseModel} model - Entity model class
   * @returns {Promise<any[]>}
   */
  static async findAll(model: BaseModel) {
    if (!isSubclassOf(model, BaseModel)) {
      throw new Error("model must inherit from BaseModel");
    }
    const results: any[] = [];
    const collectionRef = collection(_firestore, model.getCollectionName());

    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      const mappedDoc = { id: doc.id, ...doc.data() };
      results.push(mappedDoc);
    });
    return results;
  }

  /**
   * Deletes a document by ID.
   * @param {BaseModel} model - Entity model class
   * @param {string} id - Document ID
   * @returns {Promise<void>}
   */
  static async remove(model: BaseModel, id: string) {
    if (!isSubclassOf(model, BaseModel)) {
      throw new Error("model must inherit from BaseModel");
    }
    const docRef = doc(_firestore, `${model.getCollectionName()}/${id}`);
    return await deleteDoc(docRef);
  }
}
