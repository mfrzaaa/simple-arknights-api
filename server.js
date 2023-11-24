import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/routes";
const app = express();

const configDB = {
    url: "mongodb://localhost:27017/character",
};

app.use(express.json());
app.use(router);

mongoose.set("strictQuery", false);
mongoose
    .connect(configDB.url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));