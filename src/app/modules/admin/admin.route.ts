import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const router = Router();

router.patch(
  "/approve",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.approveCompany,
);
router.patch(
  "/reject",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.rejectCompany,
);
router.patch(
  "/approve-delivery-man",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.approveDeliveryMan,
);
router.post(
  "/reject-delivery-man",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.rejectDeliveryMan,
);
router.patch(
  "/assign-pickup-hub",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.assignPickupHubToParcel,
);
router.patch(
  "/assign-delivery-hub",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.HUB_ADMIN),
  AdminController.assignDeliveryHubToParcel,
);
router.post(
  "/hub-admin/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.makeHubAdmin,
);
router.delete(
  "/hub-admin/delete",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.deleteHubAdmin,
);

export const AdminRoutes = router;
