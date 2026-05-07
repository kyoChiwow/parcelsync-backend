import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { companySearchableFields } from "./company.constant";
import { ICompany } from "./company.interface";
import { Company } from "./company.model";

const createCompanyService = async (
  payload: Partial<ICompany>,
  decodedToken: JwtPayload,
) => {
  const { userId, isActive } = decodedToken;

  const companyData = { ...payload, userId };

  if (!isActive) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Please verify your profile before creating a company.",
    );
  }

  const createCompany = await Company.create(companyData);

  return createCompany;
};

const getAllCompanyService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Company.find(), query);

  const companies = queryBuilder
    .filter()
    .search(companySearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    companies.build(),
    companies.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleCompanyService = async (id: string) => {
  const company = await Company.findById(id);

  return company;
};

const deleteSingleCompanyService = async (id: string) => {
  return await Company.findByIdAndDelete(id);
};

const getMyCompaniesService = async (userId: string) => {
  const companies = await Company.find({ userId });
  return companies;
};

export const CompanyServices = {
  createCompanyService,
  getAllCompanyService,
  getSingleCompanyService,
  deleteSingleCompanyService,
  getMyCompaniesService,
};
