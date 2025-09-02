export const ADMIN_COOKIE = "admin_session";

export function checkAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  return input === expected;
}

