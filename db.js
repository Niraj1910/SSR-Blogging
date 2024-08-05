const mongoose = require("mongoose");

const URI = `mongodb://127.0.0.1:27017/blogging`;

function connectToDB() {
  mongoose
    .connect(URI)
    .then(() => console.log(`Connected to MongDB`))
    .catch(() => console.log(`Could not connect to MongoDB`));
}

module.exports = { connectToDB };
