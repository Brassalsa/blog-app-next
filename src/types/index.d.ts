type AppResponseType<T> = {
  data: T;
  err: string | null;
  statusCode: number;
  type: "ok" | "err";
};
