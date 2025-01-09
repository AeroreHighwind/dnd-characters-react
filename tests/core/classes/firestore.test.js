import { BaseModel } from "../../../src/core/classes/base-model.class";
import { FirestoreAPI } from "../../../src/core/classes/firestore.class";

jest.mock("../../../src/core/config/firebase.connection", () => ({
  firestore: {},
  realtimeDB: {},
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
  id = "!@#s2327664AS[ZCOXP";
}

class CollectionlessModel extends BaseModel {}

describe("FirestoreAPI create method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should fail if the entity passed is a direct instance of BaseModel", async () => {
    const baseModel = new BaseModel();
    await expect(FirestoreAPI.create(baseModel)).rejects.toThrow(
      "Collection name must be defined in the subclass: BaseModel"
    );
  });

  test("Should fail if the children class of BaseModel does not have a static collectionName property", async () => {
    const collectionless = new CollectionlessModel();
    await expect(FirestoreAPI.create(collectionless)).rejects.toThrow(
      `Collection name must be defined in the subclass: ${collectionless.constructor.name}`
    );
  });

  test("Should get the reference to the collection if the entity passed is an instance of a class inheriteing from BaseModel", async () => {
    const mockModel = new MockModel();
    mockModel.getCollectionName();
    await expect(FirestoreAPI.create(mockModel)).resolves.not.toBeNull();
  });

  test("Should pass if the entity passed is an instance of class BaseModel", async () => {
    const mockModel = new MockModel();

    await expect(FirestoreAPI.create(mockModel)).resolves.not.toBeNull();
  });
});

describe("firestore update method tests", () => {
  let mockModel;

  beforeEach(() => {
    mockModel = new MockModel();
    jest.clearAllMocks();
  });

  test("should throw an error if the model is not an instance of a children class from BaseModel", async () => {
    const collectionlessModel = new CollectionlessModel();
    await expect(
      // @ts-ignore
      FirestoreAPI.update(collectionlessModel, undefined)
    ).rejects.toThrow("id of entity to update is required");
  });
});
