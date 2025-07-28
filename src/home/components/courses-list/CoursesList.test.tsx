import {
  render, userEvent, cleanup, within, screen, reactRouter,
} from '@src/setupTest';
import { mockCourseDiscoveryResponse, mockFrontendParamsResponse } from '@src/__mocks__';
import { useFrontendParamsQuery } from '@src/data/frontend-params/hooks';
import { useCourseDiscovery } from '@src/data/course-discovery/hooks';
import CoursesList from './CoursesList';

import messages from './messages';

jest.mock('@src/data/frontend-params/hooks', () => ({
  useFrontendParamsQuery: jest.fn(),
}));

jest.mock('@src/data/course-discovery/hooks', () => ({
  useCourseDiscovery: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    INFO_EMAIL: process.env.INFO_EMAIL,
  })),
}));

const mockUseCourseDiscovery = useCourseDiscovery as jest.Mock;
const mockUseFrontendParamsQuery = useFrontendParamsQuery as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

beforeEach(() => {
  mockUseFrontendParamsQuery.mockReturnValue({
    data: {
      ...mockFrontendParamsResponse,
      enableCourseSortingByStartDate: false,
    },
  });
});

describe('<CoursesList />', () => {
  it('shows loading state', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<CoursesList />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows empty courses state', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        ...mockCourseDiscoveryResponse,
        results: [],
      },
    });

    render(<CoursesList />);
    const infoAlert = screen.getByRole('alert');
    expect(within(infoAlert).getByText(messages.noCoursesAvailable.defaultMessage)).toBeInTheDocument();
    expect(within(infoAlert).getByText(messages.noCoursesAvailableMessage.defaultMessage)).toBeInTheDocument();
  });

  it('displays courses when data is available', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockCourseDiscoveryResponse,
    });

    render(<CoursesList />);
    mockCourseDiscoveryResponse.results.forEach(course => {
      expect(screen.getByText(course.data.content.displayName)).toBeInTheDocument();
    });
  });

  it('shows "View All Courses" button when more courses are available than max', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(reactRouter, 'useNavigate').mockReturnValue(mockNavigate);

    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockCourseDiscoveryResponse,
    });

    mockUseFrontendParamsQuery.mockReturnValueOnce({
      data: {
        ...mockFrontendParamsResponse,
        homepageCourseMax: 1,
        enableCourseSortingByStartDate: false,
      },
    });

    render(<CoursesList />);
    const button = screen.getByText(messages.viewAllCoursesButton.defaultMessage);

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/courses');
  });

  it('does not show "View All Courses" button when courses ≤ max', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockCourseDiscoveryResponse,
    });

    mockUseFrontendParamsQuery.mockReturnValueOnce({
      data: {
        ...mockFrontendParamsResponse,
        homepageCourseMax: 3,
        enableCourseSortingByStartDate: false,
      },
    });

    render(<CoursesList />);
    expect(screen.queryByText(messages.viewAllCoursesButton.defaultMessage)).not.toBeInTheDocument();
  });
});
