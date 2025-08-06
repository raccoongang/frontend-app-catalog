import { IntlShape } from '@edx/frontend-platform/i18n';

import { CourseDiscoveryResponse } from '../data/course-discovery/types';

export interface TransformedCourseItem {
  id: string;
  famous_for: string;
  language: string;
  modes: string[];
  org: string;
  data: CourseDiscoveryResponse['results'][0]['data'];
  index?: string;
  type?: string;
}

export interface GetPageTitleProps {
  intl: IntlShape;
  lastSearchQuery: string;
  searchString: string;
  courseData: CourseDiscoveryResponse | undefined;
}
