import mongoose from "mongoose";

const charaSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        gender: String,
        race: String,
        stars: Number,
    },
    {
        versionKey: false,
    }
);
charaSchema.methods.toJSON = function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};
export const charaModel = mongoose.model('character', charaSchema);