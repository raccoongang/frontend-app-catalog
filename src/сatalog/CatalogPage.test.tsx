import { screen, within } from '@testing-library/react';
import messages from './messages';
import { render } from '../setupTest';
import { mockCourseDiscoveryResponse } from './__mocks__';
import CatalogPage from './CatalogPage';
import { useCourseDiscovery } from './data/hooks';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    INFO_EMAIL: 'test@example.com',
  })),
}));

jest.mock('./data/hooks', () => ({
  useCourseDiscovery: jest.fn(),
}));

const mockUseCourseDiscovery = useCourseDiscovery as jest.Mock;

describe('CatalogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<CatalogPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should show empty courses state', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        ...mockCourseDiscoveryResponse,
        results: [],
      },
    });

    render(<CatalogPage />);
    expect(screen.getByText('Viewing 0 courses')).toBeInTheDocument();
    const infoAlert = screen.getByRole('alert');
    expect(within(infoAlert).getByText(messages.noCoursesAvailable.defaultMessage)).toBeInTheDocument();
    expect(within(infoAlert).getByText(messages.noCoursesAvailableMessage.defaultMessage)).toBeInTheDocument();
  });

  it('should display courses when data is available', () => {
    mockUseCourseDiscovery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockCourseDiscoveryResponse,
    });

    render(<CatalogPage />);
    expect(screen.getByText(`Viewing ${mockCourseDiscoveryResponse.results.length} courses`)).toBeInTheDocument();

    // Verify all courses are displayed
    mockCourseDiscoveryResponse.results.forEach(course => {
      expect(screen.getByText(course.data.content.displayName)).toBeInTheDocument();
    });
  });
});
