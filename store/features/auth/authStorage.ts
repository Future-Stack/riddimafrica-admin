import type { AuthTokens } from "./types/authTypes";

const ACCESS_TOKEN_KEY = "riddimafrica-admin:accessToken";
const REFRESH_TOKEN_KEY = "riddimafrica-admin:refreshToken";
const REMEMBER_IDENTIFIER_KEY = "riddimafrica-admin:rememberIdentifier";
const REMEMBER_ME_KEY = "riddimafrica-admin:rememberMe";

const canUseStorage = () => typeof window !== "undefined";

const readToken = (key: string): string | null => {
  if (!canUseStorage()) return null;
  return localStorage.getItem(key) ?? sessionStorage.getItem(key);
};

export const getStoredAccessToken = (): string | null => {
  return readToken(ACCESS_TOKEN_KEY);
};

export const getStoredTokens = (): AuthTokens | null => {
  const accessToken = readToken(ACCESS_TOKEN_KEY);
  const refreshToken = readToken(REFRESH_TOKEN_KEY);

  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken: refreshToken ?? "",
  };
};

export const persistTokens = (tokens: AuthTokens, rememberMe = true) => {
  if (!canUseStorage()) return;

  const persistent = rememberMe ? localStorage : sessionStorage;
  const ephemeral = rememberMe ? sessionStorage : localStorage;

  persistent.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  persistent.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  ephemeral.removeItem(ACCESS_TOKEN_KEY);
  ephemeral.removeItem(REFRESH_TOKEN_KEY);
  localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? "true" : "false");
};

export const clearStoredTokens = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getRememberMe = (): boolean => {
  if (!canUseStorage()) return false;
  return localStorage.getItem(REMEMBER_ME_KEY) === "true";
};

export const getRememberedIdentifier = (): string => {
  if (!canUseStorage()) return "";
  return localStorage.getItem(REMEMBER_IDENTIFIER_KEY) ?? "";
};

export const persistRememberedIdentifier = (identifier: string) => {
  if (!canUseStorage()) return;
  localStorage.setItem(REMEMBER_IDENTIFIER_KEY, identifier);
};

export const clearRememberedIdentifier = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(REMEMBER_IDENTIFIER_KEY);
};
