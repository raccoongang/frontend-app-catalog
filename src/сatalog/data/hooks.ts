import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { fetchCourseDiscovery } from './api';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from './constants';
import { CourseDiscoveryResponse } from './types';

/**
 * A React Query hook that fetches course discovery data.
 */
export const useCourseDiscovery = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search_query') || '';

  return useQuery<CourseDiscoveryResponse, Error>({
    queryKey: ['courseDiscovery', searchQuery],
    queryFn: () => fetchCourseDiscovery(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX, searchQuery),
  });
};
