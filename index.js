import startScraping from "./src/script-logic.js";
import { connectToDatabase } from "./src/db-connector.js";
import { timeout } from "./src/utils.js";

const main = async () => {
  let timeToWaitInHours = 1;
  try {
    connectToDatabase();
    while (true) {
      startScraping();
      await timeout(timeToWaitInHours * 3600000);
    }
  } catch (error) {
    console.log("Oops! Something went wrong :( ", error);
  }
};

main();
