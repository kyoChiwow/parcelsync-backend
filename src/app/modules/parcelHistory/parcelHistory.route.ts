import { Router } from "express";
import { ParcelHistoryController } from "./parcelHistory.controller";

const router = Router();


router.get("/:id", ParcelHistoryController.getSingleParcelHistory);

export const ParcelHistoryRoutes = router;