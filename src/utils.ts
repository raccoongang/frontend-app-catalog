import { getConfig } from '@edx/frontend-platform';

/**
 * Gets a cookie by name.
 */
export const getCookie = (name: string): string | null => {
  let cookieValue: string | null = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const languagePreference = getCookie(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME);
  return date.toLocaleDateString(languagePreference || 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
