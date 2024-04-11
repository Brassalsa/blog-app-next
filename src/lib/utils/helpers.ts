export function checkEnvVarsOrThrow(env: string | undefined) {
  if (!env) {
    throw new Error("env var is not found");
  }

  return env;
}
