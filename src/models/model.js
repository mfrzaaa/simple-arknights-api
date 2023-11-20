import mongoose from "mongoose";

const charaSchema = mongoose.Schema(
    {
        Name: String,
        Type: String,
    }
);
charaSchema.methods.toJSON = function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};
export const charaModel = mongoose.model('charaModel', charaSchema);