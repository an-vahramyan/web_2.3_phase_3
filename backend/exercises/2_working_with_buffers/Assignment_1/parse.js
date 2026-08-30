const fs = require("fs");
const buffer = fs.readFileSync("records.bin");

let records = [];
let offset = 7;
let recordCount = buffer.readUInt16BE(5);

while (recordCount) {
  let timestamp = buffer.readUInt32BE(offset);
  let temperature = buffer.readUInt8(offset + 4);
  let sensorId = buffer.readFloatBE(offset + 8);

  const date = new Date(timestamp * 1000);

  let obj = { timestamp: date, temperature, sensorId };

  records.push(obj);

  offset += 9;
  recordCount--;
}
console.log(records);
