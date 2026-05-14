import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const router = Router();

router.patch("/approve", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.approveCompany);
router.patch("/reject", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.rejectCompany);
router.patch("/approve-delivery-man", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.approveDeliveryMan);
router.patch("/reject-delivery-man", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.rejectDeliveryMan);

export const AdminRoutes = router;