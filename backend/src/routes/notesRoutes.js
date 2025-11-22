import express from "express";
import {delNote, getAllNotes, putNote, createNote, getRouterById} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getRouterById);
router.post("/",createNote);
router.put("/:id", putNote);
router.delete("/:id", delNote);

export default router

