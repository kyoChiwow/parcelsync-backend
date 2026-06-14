import { Router } from "express";
import { LocationController } from "./location.controller";

const router = Router();

router.get("/division", LocationController.getAllDivision);
router.get("/areas", LocationController.getAllAreas);
router.get("/district", LocationController.getAllDistrict);

export const LocationRoutes = router;
