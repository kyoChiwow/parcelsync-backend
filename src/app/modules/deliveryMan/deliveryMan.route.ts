import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DeliveryManController } from "./deliveryMan.controller";

const router = Router();

router.post("/apply", checkAuth(Role.USER), DeliveryManController.applyForDeliveryMan);
router.get("/all-applications", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DeliveryManController.getAllApplications);
router.get("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DeliveryManController.getSingleApplication);

export const DeliveryManRoutes = router;