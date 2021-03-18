export const config = {
  TOKEN: '__ACCESS_TOKEN__',
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_URL ?? '',
  TIME_OUT: Number(process.env.NEXT_PUBLIC_IDLE_TIME ?? 0),
};
