import { Router } from "express";
import { createRecord, getRecord, getRecords } from "../controllers/carController.js";

const router = Router();
router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", createRecord);
routes.put("/:id", updateRoute);

export const carRoutes = router;
