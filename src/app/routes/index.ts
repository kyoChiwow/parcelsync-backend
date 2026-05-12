import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OtpRoutes } from "../modules/otp/otp.route";
import { UserRoutes } from "../modules/user/user.route";
import { CompanyRoutes } from "../modules/company/company.route";
import { HubRoutes } from "../modules/hub/hub.route";
import { ParcelRoutes } from "../modules/parcels/parcel.route";
import { AdminRoutes } from "../modules/admin/admin.route";

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
  },
  {
    path: "/hub",
    route: HubRoutes,
  },
  {
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
