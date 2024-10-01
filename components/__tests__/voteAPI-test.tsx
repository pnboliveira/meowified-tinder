import { voteAPI } from "@/utils/voteAPI";
import fetchMock from "jest-fetch-mock";

describe("voteAPI", () => {
  const mockApiKey = process.env.EXPO_PUBLIC_API_KEY;

  beforeAll(() => {
    process.env.EXPO_PUBLIC_API_KEY = mockApiKey;
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
  it("should throw an error if the response is not ok", async () => {
    fetchMock.mockResponseOnce("", { status: 401 });

    const voteData = { catId: "abc123", vote: 1 };

    await expect(voteAPI(voteData)).rejects.toThrow("HTTP error! status: 401");
  });
});
