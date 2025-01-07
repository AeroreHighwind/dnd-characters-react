import { BaseModel } from "../../../src/core/classes/base-model.class";
import { FirestoreAPI } from "../../../src/core/classes/firestore.class";
import { addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "../../../src/core/config/firebase.connection";

jest.mock("../../../src/core/config/firebase.connection", () => ({
  firestore: {}, // Mock Firestore instance
  realtimeDB: {}, // Mock Realtime Database instance if needed
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  updateDoc: jest.fn(),
}));

class MockModel extends BaseModel {
  static collectionName = "testCollection";
  name = "Test Name";
}

describe("FirestoreAPI create method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Create method should fail if the entity passed is an object of class BaseModel", async () => {
    const erroneousModel = new BaseModel(); // Not an instance of BaseModel

    await expect(FirestoreAPI.create(erroneousModel)).rejects.toThrow(
      "Collection name must be defined in the subclass: BaseModel"
    );
  });
});
