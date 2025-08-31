import { t } from "i18next";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(t("Please enter a valid email")),
    password: z.string().min(3, t("auth.errors.password_error")),
});