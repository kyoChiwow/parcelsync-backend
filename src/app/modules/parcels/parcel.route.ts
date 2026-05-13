import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelController } from "./parcel.controller";

const router = Router();

router.post("/create", checkAuth(Role.COMPANY), ParcelController.createParcel);
router.get(
  "/all-parcels",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  ParcelController.getAllParcels,
);
router.get(
  "/my-parcels",
  checkAuth(Role.COMPANY),
  ParcelController.getUserParcels,
);
router.get(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.COMPANY),
  ParcelController.getSingleParcel,
);

export const ParcelRoutes = router;
