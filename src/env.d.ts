/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly VITE_DATABASE_USERNAME: string;
  readonly VITE_DATABASE_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
