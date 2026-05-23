import { Router } from "express";
import { LocationController } from "./location.controller";

const router = Router();

router.get("/division", LocationController.getAllDivision);

export const LocationRoutes = router;
