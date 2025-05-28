import { camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import {
  COURSE_DISCOVERY_URL,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
} from './constants';

import { CourseDiscoveryResponse } from './types';

/**
 * Fetches course discovery data from the API.
 * @async
 */
export const fetchCourseDiscovery = async (
  pageSize = DEFAULT_PAGE_SIZE,
  pageIndex = DEFAULT_PAGE_INDEX,
  searchQuery = '',
): Promise<CourseDiscoveryResponse> => {
  const { data } = await getAuthenticatedHttpClient()
    .post(
      COURSE_DISCOVERY_URL,
      {
        search_string: searchQuery,
        page_size: pageSize,
        page_index: pageIndex,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      },
    );

  return camelCaseObject(data);
};
