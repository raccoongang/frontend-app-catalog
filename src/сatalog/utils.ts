import { CheckboxFilter } from '@openedx/paragon';
import { IntlShape } from '@edx/frontend-platform/i18n';

import type { CourseDiscoveryResponse, Aggregations } from '../data/course-discovery/types';
import type { TransformedCourseItem, GetPageTitleProps } from './types';
import messages from './messages';

/**
 * Determines the appropriate page title based on search state and results.
 */
export const getPageTitle = ({
  intl,
  lastSearchQuery,
  searchString,
  courseData,
}: GetPageTitleProps) => {
  if (lastSearchQuery && !searchString) {
    return intl.formatMessage(messages.noSearchResults, { query: lastSearchQuery });
  }
  if (searchString && (courseData?.results?.length ?? 0) === 0) {
    return intl.formatMessage(messages.noSearchResults, { query: searchString });
  }
  if (searchString) {
    return intl.formatMessage(messages.searchResults, { query: searchString });
  }
  return intl.formatMessage(messages.exploreCourses);
};

/**
 * Transforms course discovery results into a format suitable for DataTable display.
 */
export const transformResultsForTable = (results: CourseDiscoveryResponse['results'] | undefined): TransformedCourseItem[] => {
  if (!results?.length) {
    return [];
  }

  return results.map(item => ({
    id: item.id,
    famous_for: item.data.content.displayName,
    language: item.data.language,
    modes: item.data.modes,
    org: item.data.org,
    data: item.data,
    index: item.index,
    type: item.type,
  }));
};

/**
 * Transforms aggregations into filter choices for DataTable.
 */
export const transformAggregationsToFilterChoices = (aggregations: Aggregations | undefined, intl: IntlShape) => {
  if (!aggregations) { return []; }

  const headerMap: Record<string, string> = {
    org: intl.formatMessage(messages.organizations),
    language: intl.formatMessage(messages.languages),
    modes: intl.formatMessage(messages.courseTypes),
  };

  return Object.entries(aggregations).map(([key, aggValue]) => {
    const terms = aggValue.terms || {};
    const filterChoices = Object.entries(terms).map(([termKey, count]) => ({
      name: termKey,
      number: count,
      value: termKey,
    }));

    return {
      Header: headerMap[key] || key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
      Filter: CheckboxFilter,
      filter: 'includesValue',
      filterChoices,
    };
  });
};
