const fetchAPI = async (endpoint: string) => {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  const response = await fetch(`https://api.thecatapi.com/v1/${endpoint}`, {
    headers: {
      "x-api-key": apiKey || "",
    },
  }).catch((error) => {
    console.error("There was an error!", error);
  });
  if (!response || !response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default fetchAPI;
