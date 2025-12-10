export interface Env {
  BIZFORM_KV: KVNamespace;
  BIZFORM_R2: R2Bucket;
  DB: D1Database;
  ANALYTICS_ENGINE: AnalyticsEngineDataset;
  CF_ACCESS_PUBLIC_KEY: string;
  CF_ACCESS_AUD: string;
  NAMECOM_USERNAME: string;
  NAMECOM_TOKEN: string;
  CLOUDFLARE_API_TOKEN: string;
  CF_ZONE_ID: string;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}
