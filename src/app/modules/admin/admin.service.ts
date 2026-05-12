import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { CompanyStatus } from "../company/company.interface";
import { Company } from "../company/company.model";

const updateCompanyStatus = async (id: string, status: CompanyStatus) => {
  const updatedCompany = await Company.findByIdAndUpdate(
    id,
    { isApproved: status },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedCompany) {
    throw new AppError(httpStatus.NOT_FOUND, "Company not found!");
  }

  return updatedCompany;
};

const approveCompanyService = async (id: string) => {
  return await updateCompanyStatus(id, CompanyStatus.APPROVED);
};

const rejectCompanyService = async (id: string) => {
  return await updateCompanyStatus(id, CompanyStatus.REJECTED);
};

export const AdminServices = {
  approveCompanyService,
  rejectCompanyService,
};
