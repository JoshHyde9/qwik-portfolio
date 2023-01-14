import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/edge";

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.PSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export default async function middleware(request: Request) {
  const ip = ipAddress(request) || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    console.log("Did not work");

    return "Nope";
  }

  console.log("Worked");

  return "Yes";
}
