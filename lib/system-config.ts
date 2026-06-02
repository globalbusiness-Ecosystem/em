export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  SANDBOX: true,
  API_KEY: process.env.PI_API_KEY || "giu6muchabmkobmvgwyzsmcyaowgcct2fthndhfva2tkqhuhkpr1ehktetxpu2zb",
  APP_ID: process.env.NEXT_PUBLIC_PI_APP_ID || "em-87efeb2a845a2aa4",
} as const;

export const BACKEND_CONFIG = {
  BASE_URL: "/api",
  BLOCKCHAIN_BASE_URL: "https://api.testnet.minepi.com",
} as const;

export const BACKEND_URLS = {
  LOGIN: `${BACKEND_CONFIG.BASE_URL}/login`,
  LOGIN_PREVIEW: `${BACKEND_CONFIG.BASE_URL}/login`,
  GET_PRODUCTS: (appId: string) =>
    `${BACKEND_CONFIG.BASE_URL}/products`,
  GET_PAYMENT: (paymentId: string) =>
    `${BACKEND_CONFIG.BASE_URL}/payments/${paymentId}`,
  APPROVE_PAYMENT: (paymentId: string) =>
    `${BACKEND_CONFIG.BASE_URL}/payments/${paymentId}/approve`,
  COMPLETE_PAYMENT: (paymentId: string) =>
    `${BACKEND_CONFIG.BASE_URL}/payments/${paymentId}/complete`,
} as const;

export const PI_PLATFORM_URLS = {} as const;

export const PI_BLOCKCHAIN_URLS = {
  GET_TRANSACTION: (txid: string) =>
    `${BACKEND_CONFIG.BLOCKCHAIN_BASE_URL}/transactions/${txid}/effects`,
} as const;
