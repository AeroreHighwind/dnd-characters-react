const gatewayURL = import.meta.env.VITE_USERS_URL;

const findAll = async (entity) => {
  try {
    const res = await fetch(gatewayURL + `/${entity}`); // Missing `await` corrected
    const data = await res.json(); // Parse JSON properly
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    return null; // Return null to avoid issues if the call fails
  }
};
const API = {
  findAll, // Define `findAll` as a method of the `API` object
};
export default API;

export async function create() {
  const res = await fetch(gatewayURL);
  return res;
}
