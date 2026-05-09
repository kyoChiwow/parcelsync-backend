import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { HubController } from "./hub.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createHubValidationSchema } from "./hub.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createHubValidationSchema),
  HubController.createHub,
);

export const HubRoutes = router;
