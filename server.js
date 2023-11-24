import express from "express";
import mongoose from "mongoose";
import configDB from "./src/config/dbconfig.js";
import router from "./src/routes/routes.js";
const app = express();

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

const port = 27017 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));