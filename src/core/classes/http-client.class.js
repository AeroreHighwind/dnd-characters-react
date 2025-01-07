export class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    if (!baseURL) {
      throw new Error(
        "The baseURL parameter is required to instantiate HttpClient."
      );
    }
  }

  // Helper method to handle fetch logic
  async request(method, endpoint, body = null, customHeaders = {}) {
    const url = `${this.baseURL}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("HttpClient Error:", error);
      return null;
    }
  }

  // CRUD Operations
  async get(endpoint, customHeaders = {}) {
    return this.request("GET", endpoint, null, customHeaders);
  }

  async post(endpoint, body, customHeaders = {}) {
    return this.request("POST", endpoint, body, customHeaders);
  }

  async put(endpoint, body, customHeaders = {}) {
    return this.request("PUT", endpoint, body, customHeaders);
  }

  async delete(endpoint, customHeaders = {}) {
    return this.request("DELETE", endpoint, null, customHeaders);
  }
}
