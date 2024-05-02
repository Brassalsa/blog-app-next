import { ZodError } from "zod";
import { AppError, AppResponse } from "./formatter";

type AsyncFunctionType<T extends unknown[], R> = (
  ...args: T
) => Promise<R | AppResponseType<R>>;

export const asyncHandler =
  <T extends unknown[], R>(cb: AsyncFunctionType<T, R>) =>
  async (...args: T) => {
    try {
      const data = await cb(...args);
      //@ts-expect-error
      if (data?.type === "ok") {
        return data as AppResponseType<R>;
      }
      return AppResponse(data as R, 200);
    } catch (err: any) {
      if (err.type === "err") {
        return err as AppResponseType<null>;
      }
      if (err instanceof ZodError) {
        return AppError(err.issues[0].message, 400);
      }
      console.log(err);
      return AppError();
    }
  };

export default asyncHandler;
