function AppResponse<T>(data: T, statusCode = 200): AppResponseType<T> {
  return {
    data: data,
    err: null,
    statusCode: statusCode,
    type: "ok",
  };
}

function AppError(
  err = "Something went wrong!",
  statusCode = 500
): AppResponseType<null> {
  return {
    data: null,
    err: err,
    statusCode: statusCode,
    type: "err",
  };
}

export { AppError, AppResponse };
