import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelController } from "./parcel.controller";

const router = Router();

router.post("/create", checkAuth(Role.COMPANY), ParcelController.createParcel);

export const ParcelRoutes = router;