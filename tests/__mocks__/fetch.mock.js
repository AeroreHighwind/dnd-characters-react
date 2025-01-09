// @ts-ignore
export const mockFetchGet = jest.fn(() =>
  Promise.resolve({
    ok: true, // Indicates the response was successful
    status: 200, // HTTP status code
    json: () =>
      Promise.resolve({
        key: "value", // Mocked JSON response
      }),
  })
);

export const mockFetchPost = jest.fn((url, options) => {
  const { method, body } = options || {}; // Extract method and body from options
  const parsedBody = body ? JSON.parse(body) : null;

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve(
        method === "POST" && parsedBody
          ? parsedBody
          : { error: "Invalid request" }
      ),
  });
});
