import configDB from "../config/dbconfig.js";
import mongoose from "mongoose";
import { charaModel } from "./model.js";

const configModel = {
    mongoose,
    url: configDB.url,
    character: charaModel,
};
export default configModel;