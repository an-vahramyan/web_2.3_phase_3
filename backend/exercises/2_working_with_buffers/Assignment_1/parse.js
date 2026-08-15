const buffer = fs.readFileSync("records.bin");
/*
1. Read/validate magic
2. Read/validate version
3. Read recordCount
4. Start at offset = 7
5. Loop recordCount times
6. Read timestamp
7. Read temperature
8. Read sensorId
9. Create object
10. offset += 9
*/
const timestamp = buffer.readUInt32BE(offset);
const date = new Date(timestamp * 1000)
const temperature = buffer.readFloatBE(offset + 4);
const sensorId = buffer.readUInt8(offset + 8);
