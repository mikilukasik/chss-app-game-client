import uuid from 'uuid-random';
import { measureClientSpeed } from './speedService';

const getCookie = (name) => {
  const parts = `; ${document.cookie}`.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(';')[0];
};

export const ensureCookies = async() => {
  await ensureClientIdCookie();
  await ensureClientSpeedCookie();
};

export const ensureClientIdCookie = async() => {
  if (getCookie('CHSS_CLIENT_ID')) return;
  document.cookie = `CHSS_CLIENT_ID=${uuid()}`;
};

export const ensureClientSpeedCookie = async() => {
  if (getCookie('CHSS_CLIENT_SPEED')) return;
  document.cookie = `CHSS_CLIENT_SPEED=${await measureClientSpeed()}`;
};
