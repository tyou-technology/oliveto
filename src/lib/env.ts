import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  NEXT_PUBLIC_API_URL: z.string().url().refine(
    (url) => url.startsWith("http://") || url.startsWith("https://"),
    "URL must use http or https protocol"
  ),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  

  NEXT_PUBLIC_CLIENT_TOKEN: z.string().min(1),
});

const _env = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_CLIENT_TOKEN: process.env.NEXT_PUBLIC_CLIENT_TOKEN,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
