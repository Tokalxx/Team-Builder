const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getServant = async (name) => {
  const params = new URLSearchParams({
    name,
    lore: "false",
    excludeCollectionNo: "0",
    type: "normal",
  });

  const response = await fetch(
    `${BASE_URL}/nice/NA/servant/search?${params.toString()}`, // ✅ correct endpoint
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
