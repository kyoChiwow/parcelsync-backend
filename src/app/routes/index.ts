import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OtpRoutes } from "../modules/otp/otp.route";
import { UserRoutes } from "../modules/user/user.route";
import { CompanyRoutes } from "../modules/company/company.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/otp",
    route: OtpRoutes,
  },
  {
    path: "/company",
    route: CompanyRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
