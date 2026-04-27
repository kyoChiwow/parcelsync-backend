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
  session.startTransaction();

  try {
    const isUserExist = await User.findOne({ email }).session(session);
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

    const [user] = await User.create([{
      email,
      password: hashedPassword,
      auths: [authProvider],
      ...rest,
    }], { session });

    await OtpServices.sendOTPService(user.email, user.name, session);

    await session.commitTransaction();
    await session.endSession();

    return user;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(500, "Something went wrong!", error);
  } 
};

export const UserServices = {
  createUserService,
};
