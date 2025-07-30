export interface EnrollmentButtonTypes {
  singlePaidMode: {};
  ecommerceCheckout: boolean;
  isEnrollmentPending: boolean;
  onEnroll: () => void;
  onEcommerceCheckout: () => void;
}

export interface EnrolledStatusTypes {
  showCoursewareLink: boolean;
  courseId: string;
}

export interface StatusAlertTypes {
  variant: 'info' | 'success' | 'danger';
  messageKey: string;
}
