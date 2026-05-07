import { sendResponse } from './../../utils/sendResponse';
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchASync";
import { ICompany } from "./company.interface";
import { CompanyServices } from "./company.service";

const createCompany = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const payload: ICompany = {
    ...req.body,
    userId: decodedToken?.userId,
  };

  const result = await CompanyServices.createCompanyService(payload, decodedToken);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Company created successfully",
    data: result,
  });
});

const getAllCompany = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await CompanyServices.getAllCompanyService(
    query as Record<string, string>
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company retrieved successfully",
    data: result.data,
    meta: result.meta
  })
})

const getSingleCompany = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CompanyServices.getSingleCompanyService(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company retrieved successfully",
    data: result,
  });
});

const deleteSingleCompany = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CompanyServices.deleteSingleCompanyService(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company deleted successfully",
    data: result,
  });
});

const getMyCompanies = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const result = await CompanyServices.getMyCompaniesService(decodedToken.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company retrieved successfully",
    data: result,
  });
});

export const CompanyController = {
  createCompany,
  getAllCompany,
  getSingleCompany,
  deleteSingleCompany,
  getMyCompanies
};
