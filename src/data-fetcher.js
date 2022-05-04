import axios from "axios";

/**
 * Gets items data from the Target API
 * @param {number} pageNumber pagination offset
 * @param {number} pageSize number of products to retrieve per page
 * @returns raw items data
 */
export const getItems = async (pageNumber, pageSize) => {
  let items = [];
  await axios
    .get(
      `https://www.rei.com/rei-garage/s/garage-latest-arrivals?json=true&ir=collection:garage-latest-arrivals&page=${pageNumber}&pagesize=${pageSize}`
    )
    .then((response) => {
      if (response.status == 200) {
        items = response.data.searchResults.results;
      } else {
        throw response;
      }
    })
    .catch((error) => {
      throw error;
    });
  return items;
};

export default {};
