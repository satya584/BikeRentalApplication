const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/bikes",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    (err) => {
        if (err) throw err;
        console.log("connected to mongodb");
    }
);

app.use("/api/bikes", require("./routes/apiRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/transaction", require("./routes/transactionRoutes"));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now at http://localhost:${PORT}`);
});
