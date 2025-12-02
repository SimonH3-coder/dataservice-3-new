import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/brandController.js";

const router = Router();
// Subroutes til /api/brands
router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
