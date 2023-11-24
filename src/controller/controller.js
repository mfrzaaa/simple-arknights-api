import configModel from "../models/index";
const charaModel = configModel.chara;

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns get All chara in database
 */

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
        const charaName = await charaModel.findById(req.params.Name);
        if (!charaName) return res.status(404).json({ message: "Character not found" });
        return res.status(200).json({
            message: "Success",
            data: charaName,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createChara = async (req, res) => {
    const chara = req.body;
    const newChara = new charaModel(chara);
    try {
        await newChara.save();
        return res.status(201).json({
            message: "Success",
            data: newChara,
        });
    } catch (error) {
        return res.status(409).json({
            message: error.message,
        });
    }
};
export const updateChara = async (req, res) => {
    try {
        const data = req.body;
        const chara = await charaModel.findById(req.params.Name);
        if (chara) {
            chara.Name = data.Name;
            chara.Type = data.Type;
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
        const chara = await charaModel.findById(req.params.Name);
        if (chara) {
            await chara.remove();
            return res.status(200).json({ message: "Character deleted" });
        } else {
            return res.status(404).json({ message: "Character not found" });
        }
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};