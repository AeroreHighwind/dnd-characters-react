import { HttpClient } from "../../../src/core/classes/http-client.class";
import { mockFetchGet, mockFetchPost } from "../../__mocks__/fetch.mock";

const baseURL = "https://httpbin.org";
describe("HttpClient instantiation tests", () => {
  test("should not create an instance if no baseURL is provided", () => {
    expect(() => new HttpClient()).toThrow(
      "The baseURL parameter is required to instantiate HttpClient."
    );
  });

  test("should create an instance", () => {
    const httpClient = new HttpClient(baseURL);
    expect(httpClient.baseURL).toBeTruthy();
  });
});

describe("HttpClient GET method tests", () => {
  let httpClient;

  beforeEach(() => {
    httpClient = new HttpClient(baseURL);
    // @ts-ignore
    global.fetch = mockFetchGet;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return data from the provided GET endpoint", async () => {
    const res = await httpClient.get("get-endpoint");
    console.warn(res);

    expect(res).toBeTruthy();
  });
});

describe("HttpClient POST method tests", () => {
  let httpClient;

  beforeEach(() => {
    httpClient = new HttpClient(baseURL);
    // @ts-ignore
    global.fetch = mockFetchPost;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a response from the POST endpoint with the same object sent", async () => {
    const testObject = {
      name: "Test Character",
      class: "Tester",
      race: "Test race",
      lvl: 10,
      ownerId: "test-id",
      imgUrl: "mockedurl.test.com",
      series: "unit testing",
      stats: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
      },
    };
    const res = await httpClient.post("post-endpoint", testObject);

    expect(res).toEqual(testObject);
  });
});
