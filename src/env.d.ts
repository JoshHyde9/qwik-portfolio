/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly VITE_DATABASE_USERNAME: string;
  readonly VITE_DATABASE_PASSWORD: string;
  readonly VITE_UPSTASH_REDIS_REST_URL: string;
  readonly VITE_UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
