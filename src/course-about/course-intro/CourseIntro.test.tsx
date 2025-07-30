import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { render, screen } from '@src/setupTest';
import { mockCourseAboutResponse } from '@src/__mocks__';
import { useEnrollmentActions, useEnrollmentStatus } from './hooks';
import { CourseIntro } from './CourseIntro';
import messages from './messages';

jest.mock('./hooks', () => ({
  useEnrollmentActions: jest.fn(() => ({
    enrollmentError: null,
    isEnrollmentPending: false,
    handleChangeEnrollment: jest.fn(),
    handleEcommerceCheckout: jest.fn(),
  })),
  useEnrollmentStatus: jest.fn(() => ({
    renderStatusContent: () => <div data-testid="status-content">Status Content</div>,
  })),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(),
}));

describe('CourseIntro', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getAuthenticatedUser as jest.Mock).mockReturnValue(null);
  });

  it('renders course information correctly', () => {
    render(<CourseIntro courseAboutData={mockCourseAboutResponse} />);

    expect(screen.getByText(mockCourseAboutResponse.name)).toBeInTheDocument();

    expect(screen.getByText(mockCourseAboutResponse.org)).toBeInTheDocument();

    expect(screen.getByText(mockCourseAboutResponse.shortDescription)).toBeInTheDocument();
  });

  it('renders status content from useEnrollmentStatus hook', () => {
    render(<CourseIntro courseAboutData={mockCourseAboutResponse} />);

    expect(screen.getByTestId('status-content')).toBeInTheDocument();
  });

  it('passes correct props to enrollment hooks', () => {
    render(<CourseIntro courseAboutData={mockCourseAboutResponse} />);

    expect(useEnrollmentActions).toHaveBeenCalledWith({
      courseId: mockCourseAboutResponse.id,
      ecommerceCheckoutLink: mockCourseAboutResponse.ecommerceCheckoutLink,
    });

    expect(useEnrollmentStatus).toHaveBeenCalledWith({
      courseAboutData: mockCourseAboutResponse,
      enrollmentError: null,
      authenticatedUser: null,
      isEnrollmentPending: false,
      handleChangeEnrollment: expect.any(Function),
      handleEcommerceCheckout: expect.any(Function),
    });
  });

  it('handles authenticated user correctly', () => {
    const mockUser = { username: 'testuser' };
    (getAuthenticatedUser as jest.Mock).mockReturnValue(mockUser);

    render(<CourseIntro courseAboutData={mockCourseAboutResponse} />);

    expect(useEnrollmentStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        authenticatedUser: mockUser,
      }),
    );
  });

  it('renders with error state', () => {
    (useEnrollmentActions as jest.Mock).mockReturnValue({
      enrollmentError: messages.statusAlertEnrollmentError.defaultMessage,
      isEnrollmentPending: false,
      handleChangeEnrollment: jest.fn(),
      handleEcommerceCheckout: jest.fn(),
    });

    render(<CourseIntro courseAboutData={mockCourseAboutResponse} />);

    expect(useEnrollmentStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        enrollmentError: messages.statusAlertEnrollmentError.defaultMessage,
      }),
    );
  });
});
