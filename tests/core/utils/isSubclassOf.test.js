import { isSubclassOf } from "../../../src/core/utils/isSubclassOf";

class A {
  name = "testName";
  getName() {
    return this.name;
  }
}
class B extends A {
  customProperty = {
    name: "testProperty",
    values: [1, 2, 3],
  };

  getCustomProperty() {
    return this.customProperty;
  }
}

class C {
  inheritsOfA = false;
}

describe("Testing for utility function isSubclassOf", () => {
  test("should return true if class B is a subclass of A", () => {
    expect(isSubclassOf(B, A)).toBeTruthy();
  });

  test("should return false if class A is not a subclass of B", () => {
    expect(isSubclassOf(A, B)).toBeFalsy();
  });

  test("should return false if receives an instance of class B, instead of the class", () => {
    const testInstance = new B();
    expect(isSubclassOf(testInstance, A)).toBeFalsy();
  });

  test("should return false if receives two instances of classes, even if they one inherits from the other", () => {
    const testSubclassInstance = new B();
    const testClassInstance = new A();
    expect(isSubclassOf(testSubclassInstance, testClassInstance)).toBeFalsy();
  });

  test("should return false if receives two identical classes", () => {
    expect(isSubclassOf(C, C)).toBeFalsy();
  });
});
