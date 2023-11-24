import express from "express";
import {
    createChara,
    getAllChara,
    getCharaByName,
    updateChara,
    deleteChara,
} from "../controller/controller.js";
const router = express.Router();

router.get("/allchara", getAllChara);

router.get("/chara/:name", getCharaByName);

router.post("/chara", createChara);

router.put("/chara/:name", updateChara);

router.delete("/chara/:name", deleteChara);

export default router;