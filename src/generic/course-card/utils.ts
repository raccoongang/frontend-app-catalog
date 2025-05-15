import { getConfig } from '@edx/frontend-platform';

export const getFullImageUrl = (path: string | undefined) => `${getConfig().LMS_BASE_URL}${path}`;
