import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from "@angular/fire/firestore";
import { addDoc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase.connection";

export class FirestoreAPI {
  _firestore = firestore;

  static async create(model, dto) {
    const collectionRef = collection(this._firestore, model.getModelName());
    return addDoc(collectionRef, dto);
  }

  static async update(model, id, dto) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return updateDoc(docRef, dto);
  }

  static async findOne(model, id) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return await getDoc(docRef);
  }

  static findAll(model) {
    const collectionRef = collection(this._firestore, model.getModelName());
    return collectionData(collectionRef, { idField: "id" });
  }

  static async remove(model, id) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return await deleteDoc(docRef);
  }
}
