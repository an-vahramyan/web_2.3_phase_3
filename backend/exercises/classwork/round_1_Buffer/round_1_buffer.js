const fs = require("fs");

const buffer = fs.readFileSync("input.txt");
const shift = Number(process.argv[2]);

const caesarShift = (byte, shift) => {
  return (((byte + shift) % 26) + 26) % 26;
};

for (let i = 0; i < buffer.length; i++) {
  if (buffer[i] >= 65 && buffer[i] <= 90) {
    const position = buffer[i] - 65;
    let calculatedPosition = caesarShift(position, shift);
    let newByte = calculatedPosition + 65;

    buffer[i] = newByte;
  } else if (buffer[i] >= 97 && buffer[i] <= 122) {
    const position = buffer[i] - 97;
    let calculatedPosition = caesarShift(position, shift);
    let newByte = calculatedPosition + 97;

    buffer[i] = newByte;
  }
}
fs.writeFileSync("output.txt", buffer);

//const shift = +proccess.argv[3] || 2
//const inputPath = proccess.argv[3]  || "another.txt"