import express from "express";
import mongoose from "mongoose";
import configDB from "./src/config/dbconfig.js";
import router from "./src/routes/routes.js";
import cors from "cors";
const app = express();

app.use(cors());
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
        process.exit(10);
    });

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));