const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_URI);