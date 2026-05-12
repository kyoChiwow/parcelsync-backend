import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelController } from "./parcel.controller";

const router = Router();

router.post("/create", checkAuth(Role.COMPANY), ParcelController.createParcel);
router.get("/all-parcels", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), ParcelController.getAllParcels);

export const ParcelRoutes = router;