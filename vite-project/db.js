const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/gyvunuKlinika")
.then(() => {
    console.log("Prisijungta prie MongoDB");
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;