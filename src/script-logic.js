import { getItems } from "./data-fetcher.js";
import { saveItems } from "./db-connector.js";
import { timeout } from "./utils.js";

const startScraping = async () => {
  let pageNumber = 1;
  let pageSize = 90;
  let flag = true;
  while (flag) {
    const items = await getItems(pageNumber, pageSize);
    if (items.length < pageSize) {
      console.log("Reached the last page");
      flag = false;
    }
    await saveItems(items);
    pageNumber++;
    await timeout(Math.floor(Math.random() * 3 + 1) * 60000);
  }
};

export default startScraping;
