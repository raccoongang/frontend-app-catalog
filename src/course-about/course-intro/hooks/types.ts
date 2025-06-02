import { User } from '@edx/frontend-platform/auth';

import { CourseAboutDataTypes } from '../types';

export interface UseEnrollmentActionsTypes {
  courseId: string;
  ecommerceCheckoutLink: string;
}

export interface UseEnrollmentStatusTypes {
  courseAboutData: CourseAboutDataTypes;
  authenticatedUser: User;
  enrollmentError: string | null;
  isEnrollmentPending: boolean;
  handleChangeEnrollment: () => void;
  handleEcommerceCheckout: () => void;
}
