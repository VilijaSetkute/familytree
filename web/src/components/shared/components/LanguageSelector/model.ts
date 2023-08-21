export interface LanguageOptions {
  value: string;
  label: string;
  country_code: string;
  flag: string;
}

export const languageOptions: LanguageOptions[] = [
  {
    value: 'en',
    label: 'English',
    country_code: 'gb',
    flag: 'flag-icon-gb',
  },
  {
    value: 'lt',
    label: 'Lietuvių',
    country_code: 'lt',
    flag: 'flag-icon-lt',
  },
];

export const getLangugageCookie = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  const currentCookie = cookies
    .filter((cookie) => cookie.includes('i18next'))[0]
    .trim()
    .split('=')[1];
  return currentCookie || '';
};
