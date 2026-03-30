import { createAuthClient } from "better-auth/react";
import { emailOTPClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
  plugins: [usernameClient(), emailOTPClient()],
});
