const fs = require("node:fs/promises");
const path = require("node:path");

const basePath = path.join(__dirname, "config.base.json");
const environment = process.argv[2];
const overridePath = path.join(__dirname, `config.${environment}.json`);
const finalPath = path.join(__dirname, "config.final.json");
const tmpPath = path.join(__dirname, "config.final.tmp.json");



async function main() {
  let baseConfig;
  let overrideConfig = {};

  try {
    const content = await fs.readFile(basePath, "utf8");
    baseConfig = JSON.parse(content);
  } catch (err) {
    console.error(
      `Error: Faild to load ${path.basename(basePath)} : ${err.message}`,
    );
    process.exit(1);
  }

  try {
    const content = await fs.readFile(overridePath, "utf8");
    overrideConfig = JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      // console.log("Error")
      console.warn(
        `Warning: ${path.basename(overridePath)} not found. Using base config.`,
      );
    } else {
      console.error(
        `Error: Invalid JSON in ${path.basename(overridePath)} : ${err.message}`,
      );
      process.exit(1);
    }
  }

  const finalConfig = deepMerge(baseConfig, overrideConfig);
  //   console.log(finalConfig);
  const data = JSON.stringify(finalConfig, null, 2);

  try {
    await fs.writeFile(tmpPath, data);
    await fs.rename(tmpPath, finalPath);
  } catch (err) {
    console.error(
      `Error: Failed to write ${path.basename(finalPath)}: ${err.message}`,
    );
    process.exit(1);
  }

  console.log(`Successfully created ${path.basename(finalPath)}`);
}

main();
function isObj(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function deepMerge(base, override) {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (isObj(override[key]) && isObj(result[key])) {
      result[key] = deepMerge(result[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}
