import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { IsActive, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { companySearchableFields } from "./company.constant";
import { ICompany } from "./company.interface";
import { Company } from "./company.model";

const createCompanyService = async (
  payload: Partial<ICompany>,
  decodedToken: JwtPayload,
) => {
  const { userId } = decodedToken;

  const user = await User.findById(userId);

  if (user?.isActive !== IsActive.ACTIVE) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Please verify your profile before creating a company.",
    );
  }

  const session = await Company.startSession();
  session.startTransaction();

  try {
    const companyData = { ...payload, userId };

    // 1. Create Company
    const [createCompany] = await Company.create([companyData], { session });

    // 2. Add 'COMPANY' role to User
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { role: Role.COMPANY } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return createCompany;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
