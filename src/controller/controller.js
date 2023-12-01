import configModel from "../models/index.js";
const charaModel = configModel.character;

export const getAllChara = async (req, res) => {
    try {
        const chara = await charaModel.find();
        return res.status(200).json({
            message: "Success",
            data: chara,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getCharaByName = async (req, res) => {
    try {
        const chara = await charaModel.findOne({ name: req.params.name });
        if (!chara) {
            return res.status(404).json({ message: "Character not found" });
        }
        return res.status(200).json({
            message: "Success",
            data: chara,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllCharaByType = async (req, res) => {
    try {
        const chara = await charaModel.find({ type: req.params.type });
        if (chara.length === 0) {
            return res.status(404).json({ message: `No characters found for type: ${req.params.type}` });
        }
        return res.status(200).json({
            message: "Success",
            data: chara,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createChara = async (req, res) => {
    const chara = req.body;
    const newChara = new charaModel(chara);
    const existingChara = await charaModel.findOne({ name: chara.name });
    const allowedAttributes = ['name', 'type', 'gender', 'race', 'stars'];
    try {
        if (Object.keys(chara).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty",
            });
        }
        if (existingChara) {
            return res.status(409).json({
                message: "Character with the same name already exists",
            });
        }
        if (
            !Object.keys(chara).every(attr => allowedAttributes.includes(attr)) ||
            !allowedAttributes.every(attr => Object.keys(chara).includes(attr))
        )  {
            return res.status(400).json({
                message: "Request body contains invalid or missing attributes",
            });
        } else {
            await newChara.save();
            return res.status(201).json({
                message: "Success",
                data: newChara,
            });
        }
    } catch (error) {
        return res.status(409).json({
            message: error.message,
        });
    }
};
export const updateChara = async (req, res) => {
    try {
        const data = req.body;
        const chara = await charaModel.findOne({ name: req.params.name });
        if (chara) {
            chara.name = data.name;
            chara.type = data.type;
            chara.gender = data.gender;
            chara.race = data.race;
            chara.stars = data.stars;
            const updateChara = await chara.save();
            return res.status(200).json({
                message: "Success",
                data: updateChara,
            });
        } else {
            return res.status(404).json({ message: "Character not found" });
        }
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};
export const deleteChara = async (req, res) => {
    try {
        const chara = await charaModel.findOneAndDelete({ name: req.params.name });
        if (chara) {
            return res.status(200).json({ message: "Character deleted" });
        } else {
            return res.status(404).json({ message: "Character not found" });
        }
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};