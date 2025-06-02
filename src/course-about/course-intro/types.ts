export interface CourseAboutDataTypes {
  id: string;
  name: string;
  org: string;
  shortDescription: string;
  enrollment: {
    isActive: boolean;
  };
  isCourseFull: boolean;
  isInvitationOnly: boolean;
  canEnroll: boolean;
  isShibCourse: boolean;
  allowAnonymous: boolean;
  showCoursewareLink: boolean;
  singlePaidMode: boolean;
  ecommerceCheckout: boolean;
  ecommerceCheckoutLink: string;
}

export interface CourseIntroTypes {
  courseAboutData: CourseAboutDataTypes;
}

export interface StatusAlertTypes {
  variant: 'info' | 'success' | 'danger';
  messageKey: string;
}

export interface EnrollmentButtonTypes {
  singlePaidMode: boolean;
  ecommerceCheckout: boolean;
  isEnrollmentPending: boolean;
  onEnroll: () => void;
  onEcommerceCheckout: () => void;
}

export interface EnrolledStatusTypes {
  showCoursewareLink: boolean;
  courseId: string;
}
