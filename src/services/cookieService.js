import uuid from 'uuid-random';
import { measureClientSpeed } from './speedService';

const getCookie = (name) => {
  if (typeof document === 'undefined') return;

  const parts = ` ; ${document.cookie}`.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(';')[0];
};

export const ensureCookies = async () => {
  ensureClientIdCookie();
  await ensureClientSpeedCookie();
};

export const ensureClientIdCookie = () => {
  if (typeof document === 'undefined') return;

  if (getCookie('CHSS_CLIENT_ID')) return;
  document.cookie = `CHSS_CLIENT_ID=${uuid()}; path=/`;
};

export const ensureClientSpeedCookie = async () => {
  if (typeof document === 'undefined') return;

  if (getCookie('CHSS_CLIENT_SPEED_V2')) return;
  document.cookie = `CHSS_CLIENT_SPEED_V2=${await measureClientSpeed()}; path=/`;
};
