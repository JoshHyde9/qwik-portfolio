import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 s"),
});

const getIp = (request: Request) => {
  const xff = request.headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0] : "127.0.0.1";
};

export default async function middleware(request: Request) {
  const { success, pending, ...rest } = await rateLimit.limit(getIp(request));
  await pending;
  return success ? null : rest;
}
