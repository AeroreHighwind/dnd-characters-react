import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase.connection";

export class FirestoreAPI {
  _firestore = firestore;

  static async create(model, dto) {
    const collectionRef = collection(this._firestore, model.getModelName());
    return await addDoc(collectionRef, dto);
  }

  static async update(model, id, dto) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return await updateDoc(docRef, dto);
  }

  static async findOne(model, id) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return await getDoc(docRef);
  }

  static async findAll(model) {
    const collectionRef = collection(this._firestore, model.getModelName());
    return await getDocs(collectionRef, { idField: "id" });
  }

  static async remove(model, id) {
    const docRef = doc(this._firestore, `${model.getModelName()}/${id}`);
    return await deleteDoc(docRef);
  }
}
