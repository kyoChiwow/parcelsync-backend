/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { OtpServices } from "../otp/otp.service";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const session = await User.startSession();

  try {
    session.startTransaction();

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
    }

    const hashedPassword = await bcryptjs.hash(
      password as string,
      Number(envVars.BCRYPT_SALT_ROUND),
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: email as string,
    };

    const user = await User.create({
      email,
      password: hashedPassword,
      auths: [authProvider],
      ...rest,
    });

    await OtpServices.sendOTPService(user.email, user.name);

    await session.commitTransaction();
    return user;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, "Something went wrong!", error);
  } finally {
    await session.endSession();
  }
};

export const UserServices = {
  createUserService,
};
