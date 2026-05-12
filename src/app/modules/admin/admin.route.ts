import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const router = Router();

router.patch("/approve", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.approveCompany);
router.patch("/reject", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AdminController.rejectCompany);

export const AdminRoutes = router;