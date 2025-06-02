export interface UseEnrollmentParamsTypes {
  onError: (msg: string) => void;
  errorMessage: string;
}

export interface EnrollmentFunctionTypes {
  (courseId: string, redirectUrl: string): Promise<void>;
}
