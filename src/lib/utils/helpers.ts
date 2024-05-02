export function checkEnvOrThrow(env: string | undefined) {
  if (!env) {
    throw new Error("env var is not found");
  }

  return env;
}

export function formatDate(str: string | Date) {
  const date = new Date(str).toLocaleString().split(",")[0];
  if (date === new Date().toLocaleString().split(",")[0]) {
    return "Today";
  }
  return date;
}
