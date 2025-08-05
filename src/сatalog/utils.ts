import { CheckboxFilter } from '@openedx/paragon';
import { IntlShape } from '@edx/frontend-platform/i18n';

import type { CourseDiscoveryResponse, Aggregations } from '../data/course-discovery/types';
import type { TransformedCourseItem } from './types';
import messages from './messages';

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
