export function checkEnvOrThrow(env: string | undefined) {
  if (!env) {
    throw new Error("env var is not found");
  }

  return env;
}
