import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCourseAboutData, changeCourseEnrolment } from './api';
import { EnrollmentFunctionTypes, UseEnrollmentParamsTypes } from './types';

/**
 * A React Query hook that fetches course about data.
 */
export const useCourseAboutData = (courseId: string) => useQuery({
  queryKey: ['courseAboutData', courseId],
  queryFn: () => fetchCourseAboutData(courseId),
});

/**
 * Custom hook for handling course enrollment and redirection.
 */
export function useEnrollment({ onError, errorMessage }: UseEnrollmentParamsTypes): EnrollmentFunctionTypes {
  return useCallback(async (courseId: string, redirectUrl: string) => {
    try {
      await changeCourseEnrolment(courseId);
      window.location.href = redirectUrl;
    } catch (error) {
      onError(errorMessage);
    }
  }, [onError, errorMessage]);
}
