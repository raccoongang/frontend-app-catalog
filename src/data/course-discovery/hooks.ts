import { useQuery } from '@tanstack/react-query';

import { useState, useCallback } from 'react';
import { fetchCourseDiscovery } from './api';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from './constants';
import {
  CourseDiscoveryResponse, CourseDiscoveryParams, CourseDiscoveryHook, DataTableParams,
} from './types';
import { transformDataTableFilters } from './utils';

export const useCourseDiscovery = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageIndex = DEFAULT_PAGE_INDEX,
  enableCourseSortingByStartDate = false,
  filters = {},
  searchString = '',
}: Partial<CourseDiscoveryParams> = {}): CourseDiscoveryHook => {
  const [params, setParams] = useState<CourseDiscoveryParams>({
    pageSize,
    pageIndex,
    enableCourseSortingByStartDate,
    filters,
    searchString,
  });

  const {
    data, isLoading, isError, error, isFetching,
  } = useQuery<CourseDiscoveryResponse, Error>({
    queryKey: ['courseDiscovery', params],
    queryFn: () => fetchCourseDiscovery(params),
    placeholderData: (previousData) => previousData,
  });

  /**
   * Updates query params and triggers data refetch if params have changed.
   */
  const fetchData = useCallback((newParams: DataTableParams & { searchString?: string }) => {
    const transformedFilters = transformDataTableFilters(newParams.filters);

    const transformedParams: CourseDiscoveryParams = {
      pageSize: newParams.pageSize,
      pageIndex: newParams.pageIndex,
      filters: transformedFilters,
      searchString: newParams.searchString || '',
    };

    setParams(prevParams => {
      const hasChanged = JSON.stringify(prevParams) !== JSON.stringify(transformedParams);
      return hasChanged ? transformedParams : prevParams;
    });
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    fetchData,
    isFetching,
  };
};
