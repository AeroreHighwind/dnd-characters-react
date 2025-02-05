import { BaseModel } from "../../../src/core/classes/base-model.class";

const baseModel = new BaseModel();

class TestEmptyModel extends BaseModel {}

class TestModel extends BaseModel {
  static collectionName = "testCollectionName";
}

describe("Testing for Base Model class", () => {
  test("should return undefined when reading static property collectionName", () => {
    expect(BaseModel.collectionName).toBeUndefined();
  });

  test("should throw an error when trying to get the collectionName of an instance of BaseModel", () => {
    expect(() => baseModel.getCollectionName()).toThrow(
      `Collection name must be defined in the subclass: ${baseModel.constructor.name}`
    );
  });

  test("Should throw an error if a children subclass does not specify collectionName", () => {
    const testEmpty = new TestEmptyModel();
    expect(() => testEmpty.getCollectionName()).toThrow(
      `Collection name must be defined in the subclass: ${testEmpty.constructor.name}`
    );
  });

  test("Should return the children class static property when calling getCollectionName", () => {
    const testModel = new TestModel();
    const testModelCollectionName = TestModel.collectionName; // reading static property from class
    //calling the inherited method
    expect(testModel.getCollectionName()).toBeTruthy();
    expect(testModel.getCollectionName()).toBe(testModelCollectionName);
  });
});
