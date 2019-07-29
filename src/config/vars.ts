import dotenv from "dotenv-safe";

dotenv.config();

export const port = process.env.PORT || 3000;
export const fbApplicationSecret = process.env.FB_APPLICATION_SECRET;
export const fbVerificationToken = process.env.FB_VERIFICATION_TOKEN;
export const apiUrl = process.env.API_URL;
