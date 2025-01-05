import { EntityModel } from "../classes/entity-model.class";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  DocumentSnapshot,
  QuerySnapshot,
  DocumentReference,
} from "firebase/firestore";
import { firestore } from "../config/firebase.connection";
import { isSubclassOf } from "../utils/isSubclassOf";

const _firestore = firestore;

export class FirestoreAPI {
  /**
   * Creates a new document in Firestore.
   * @param {EntityModel} model - Entity model class
   * @returns {Promise<DocumentReference>}
   */
  static async create(model) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const collectionRef = collection(_firestore, model.getCollectionName());
    const { ...rest } = model;
    return await addDoc(collectionRef, rest);
  }

  /**
   * Updates a document in Firestore.
   * @param {EntityModel} model - Entity model class
   * @param {string} id - Document ID
   * @param {Object} dto - Data Transfer Object for the update
   * @returns {Promise<void>}
   */
  static async update(model, id, dto) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const docRef = doc(_firestore, `${model.getCollectionName()}/${id}`);
    return await updateDoc(docRef, dto);
  }

  /**
   * Finds a single document by ID.
   * @param {EntityModel} model - Entity model class
   * @param {string} id - Document ID
   * @returns {Promise<DocumentSnapshot>}
   */
  static async findOne(model, id) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const docRef = doc(_firestore, `${model.getCollectionName()}/${id}`);
    return await getDoc(docRef);
  }

  /**
   * Finds all documents by user ID.
   * @param {EntityModel} model - Entity model class
   * @param {string} userId - User ID
   * @returns {Promise<QuerySnapshot>}
   */
  static async findAllByUserId(model, userId) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const collectionRef = collection(_firestore, model.getCollectionName());
    const findAllQuery = query(collectionRef, where("userId", "==", userId));
    return await getDocs(findAllQuery);
  }

  /**
   * Finds all documents in collection
   * @param {EntityModel} model - Entity model class
   * @returns {Promise<any[]>}
   */
  static async findAll(model) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const results = [];
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
   * @param {EntityModel} model - Entity model class
   * @param {string} id - Document ID
   * @returns {Promise<void>}
   */
  static async remove(model, id) {
    if (!isSubclassOf(model, EntityModel)) {
      throw new Error("model must inherit from EntityModel");
    }
    const docRef = doc(_firestore, `${model.getCollectionName()}/${id}`);
    return await deleteDoc(docRef);
  }
}
