import { camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from './constants';
import { getCourseDiscoveryUrl } from './urls';
import { addFiltersToFormData } from './utils';

import { CourseDiscoveryResponse, CourseDiscoveryParams } from './types';

/**
 * Fetches course discovery data from the API.
 * @async
 */
export const fetchCourseDiscovery = async (
  params: CourseDiscoveryParams,
): Promise<CourseDiscoveryResponse> => {
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    pageIndex = DEFAULT_PAGE_INDEX,
    enableCourseSortingByStartDate = false,
    filters = {},
  } = params;

  const formData = new FormData();
  formData.append('page_size', String(pageSize));
  formData.append('page_index', String(pageIndex));
  formData.append('enable_course_sorting_by_start_date', String(enableCourseSortingByStartDate));

  addFiltersToFormData(formData, filters);

  const { data } = await getAuthenticatedHttpClient().post(
    getCourseDiscoveryUrl(),
    formData,
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // },
  );

  return camelCaseObject(data);
};
