import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress, next, rewrite } from "@vercel/edge";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export default async function middleware(
  request: Request
): Promise<Response | undefined> {
  const ip = ipAddress(request) ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? next({ headers: { "x-from-middleware": "true" } })
    : rewrite(new URL("/blocked", request.url));
}
