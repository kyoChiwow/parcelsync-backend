import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { CompanyController } from "./company.controller";

const router = Router();

router.post("/create", checkAuth(Role.USER), CompanyController.createCompany);
router.get("/get-all", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), CompanyController.getAllCompany);
router.get("/my-companies", checkAuth(Role.USER, Role.COMPANY), CompanyController.getMyCompanies);
router.get("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), CompanyController.getSingleCompany);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), CompanyController.deleteSingleCompany);

export const CompanyRoutes = router;