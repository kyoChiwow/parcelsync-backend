import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { HubController } from "./hub.controller";
import { createHubValidationSchema } from "./hub.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createHubValidationSchema),
  HubController.createHub,
);

router.get(
  "/get-all",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  HubController.getAllHubs,
);

export const HubRoutes = router;
