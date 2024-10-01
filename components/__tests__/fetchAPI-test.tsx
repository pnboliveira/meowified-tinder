import fetchAPI from "@/utils/fetchAPI";

describe("fetchAPI", () => {
  const originalFetch = global.fetch;
  const mockEndpoint = "images/search";
  const mockResponse = [{ id: "1", url: "https://example.com/cat.jpg" }];
  const mockApiKey = process.env.EXPO_PUBLIC_API_KEY;

  beforeAll(() => {
    process.env.EXPO_PUBLIC_API_KEY = mockApiKey;
  });

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("should fetch data from the API and return JSON", async () => {
    const data = await fetchAPI(mockEndpoint);
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.thecatapi.com/v1/${mockEndpoint}`,
      {
        headers: {
          "x-api-key": "",
        },
      }
    );
  });

  it("should throw an error if the network response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    await expect(fetchAPI(mockEndpoint)).rejects.toThrow(
      "Network response was not ok"
    );
  });
});
