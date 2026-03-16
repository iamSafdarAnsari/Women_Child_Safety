const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

const getFilePath = (fileName) => path.join(dataDir, fileName);

const readJsonFile = async (fileName) => {
  const filePath = getFilePath(fileName);
  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content);
};

const writeJsonFile = async (fileName, data) => {
  const filePath = getFilePath(fileName);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

const generateNextId = (items, prefix) => {
  if (!Array.isArray(items) || items.length === 0) {
    return `${prefix}1`;
  }

  const maxNumericId = items.reduce((max, item) => {
    const match = String(item.id || "").match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(max, value);
  }, 0);

  return `${prefix}${maxNumericId + 1}`;
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  generateNextId,
};
