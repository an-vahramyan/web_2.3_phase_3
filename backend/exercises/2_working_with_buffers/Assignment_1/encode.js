const fs = require("fs");

const num = Math.floor(Date.now() / 1000);
const records = [
  {
    timestamp: num,
    temperature: 21.5,
    sensorId: 1,
  },
  {
    timestamp: num + 60,
    temperature: 22.1,
    sensorId: 2,
  },
  {
    timestamp: num + 120,
    temperature: 20.8,
    sensorId: 3,
  },
  {
    timestamp: num + 180,
    temperature: 21.9,
    sensorId: 1,
  },
  {
    timestamp: num + 240,
    temperature: 22.4,
    sensorId: 2,
  },
  {
    timestamp: num + 300,
    temperature: 23.0,
    sensorId: 1,
  },
  {
    timestamp: num + 360,
    temperature: 23.0,
    sensorId: 1,
  },
  {
    timestamp: num + 420,
    temperature: 22.7,
    sensorId: 3,
  },
  {
    timestamp: num + 480,
    temperature: 21.8,
    sensorId: 1,
  },
  {
    timestamp: num + 540,
    temperature: 22.3,
    sensorId: 3,
  },
];
const size = 7 + records.length * 9;
const buffer = Buffer.alloc(size);
buffer.write("SNSR", 0, "ascii");
buffer.writeUInt8(1, 4);
buffer.writeUInt16BE(records.length, 5);
let offset = 7;
for (const record of records) {
  buffer.writeUInt32BE(record.timestamp, offset);
  buffer.writeFloatBE(record.temperature, offset + 4);
  buffer.writeUInt8(record.sensorId, offset + 8);

  offset += 9;
}
fs.writeFileSync("records.bin", buffer);

console.log(`records.bin created successfully`);
console.log(`Records: ${records.length}`);
console.log(`File size: ${buffer.length} bytes`);
