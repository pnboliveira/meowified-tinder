// POST request to vote for a provided cat ID
export const voteAPI = async (voteData: { catId: any; vote: number }) => {
  const response = await fetch(`https://api.thecatapi.com/v1/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY || "",
    },
    body: JSON.stringify({ image_id: voteData.catId, value: voteData.vote }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
