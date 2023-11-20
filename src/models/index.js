import configDB from "../config/dbconfig";
import mongoose from "mongoose";
import { charaModel } from "./model.js";

const configModel = {
    mongoose,
    url: configDB.url,
    chara: charaModel,
};
export default configModel;