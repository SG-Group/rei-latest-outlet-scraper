import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false,
});

const DB = sequelize.define("Items", {
  sku: DataTypes.STRING,
  productId: DataTypes.STRING,
  name: DataTypes.STRING,
  price: DataTypes.REAL,
  lastUpdatedPrice: DataTypes.REAL,
  oldPrice: DataTypes.REAL,
  discount: DataTypes.NUMBER,
  url: DataTypes.STRING,
  img: DataTypes.STRING,
});

/**
 * Connects to the local db
 */
export const connectToDatabase = () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
  } catch (error) {
    console.log("Oops! Error connecting to the db :( ", error);
  }
};

/**
 * Disconnects from the local db
 */
export const disconnectFromDatabase = () => {
  try {
    sequelize.close();
  } catch (error) {
    console.log("Oops! Error disconnecting from the db :( ", error);
  }
};

/**
 * Processes raw product data and format it according to the db specification
 * @param {*} data raw product data
 * @returns formatted product data
 */
const proccessItemsData = (data) => {
  let formattedItemsList = [];
  for (let item of data) {
    for (let theme of item.availableColors) {
      formattedItemsList.push({
        sku: theme.sku,
        productId: item.prodId,
        name: item.cleanTitle,
        price: item.displayPrice.max,
        oldPrice: Number(item.regularPrice),
        discount: Number(item.percentageOff),
        url: `https://rei.com${item.link}`,
        img: `https://rei.com${
          item.colorDetails.colors.filter(
            (color) => (color.sampleSKU = theme.sku)
          )[0].swatchImageURI
        }`,
      });
    }
  }
  return formattedItemsList;
};

/**
 * Persists a list of items to the local db
 * @param {*} items raw product data
 */
export const saveItems = async (items) => {
  const formattedItems = proccessItemsData(items);
  for (let item of formattedItems) {
    let itemAlreadyExists = await DB.findOne({ where: { sku: item.sku } });
    if (itemAlreadyExists && itemAlreadyExists.price !== item.price) {
      /**
       * Updates item if it already exists in db and
       * saves last price to lastUpdatedPrice
       */
      await itemAlreadyExists
        .update({
          sku: item.sku,
          productId: item.productId,
          name: item.name,
          price: item.price,
          lastUpdatedPrice: itemAlreadyExists.price,
          oldPrice: item.oldPrice,
          discount: item.discount,
          url: item.url,
          img: item.img,
        })
        .catch(console.error);
    } else {
      await DB.create(item).catch(console.error);
    }
  }
};

export default {};
