import { HttpClient } from "../../../src/core/classes/http-client.class";

const baseURL = "https://httpbin.org";

describe("HttpClient instantiation tests", () => {
  test("should not create an instance if no baseURL is provided", () => {
    expect(() => new HttpClient()).toThrow(
      "The baseURL parameter is required to instantiate HttpClient."
    );
  });

  test("should create an instance", () => {
    const httpClient = new HttpClient(baseURL);
    expect(httpClient).toBeTruthy();
  });
});

describe("HttpClient GET method tests", () => {
  let httpClient;

  beforeEach(() => {
    httpClient = new HttpClient(baseURL);
  });

  test("should return data from the provided GET endpoint", async () => {
    const res = await httpClient.get("json");
    expect(res).toBeTruthy();
  });
});
