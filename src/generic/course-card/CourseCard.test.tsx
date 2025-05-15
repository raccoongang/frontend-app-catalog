import { screen } from '@testing-library/react';

import { render } from '../../setupTest';
import { CourseCard } from '.';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: () => ({
    LMS_BASE_URL: 'http://localhost:18000',
  }),
}));

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useMediaQuery: () => false,
}));

const mockCourse = {
  id: 'course-v1:edX+DemoX+Demo_Course',
  data: {
    id: 'course-v1:edX+DemoX+Demo_Course',
    course: 'Demo Course',
    start: '2024-04-01T00:00:00Z',
    imageUrl: '/asset-v1:edX+DemoX+Demo_Course+type@asset+block@course_image.jpg',
    org: 'edX',
    orgImg: '/asset-v1:edX+DemoX+Demo_Course+type@asset+block@org_image.jpg',
    content: {
      displayName: 'Demonstration Course',
      overview: 'Course overview',
      number: 'DemoX',
    },
    number: 'DemoX',
    modes: ['audit', 'verified'],
    language: 'en',
    catalogVisibility: 'both',
  },
};

describe('CourseCard', () => {
  const renderComponent = (course = mockCourse) => {
    render(<CourseCard course={course} />);
  };

  it('renders course information correctly', () => {
    renderComponent();

    expect(screen.getByText('Demonstration Course')).toBeInTheDocument();
    expect(screen.getByText('edX')).toBeInTheDocument();
    expect(screen.getByText('Starts: Apr 1, 2024')).toBeInTheDocument();
  });

  it('renders course image with correct src and fallback', () => {
    renderComponent();

    const image = screen.getByAltText('Demonstration Course');
    expect(image).toHaveAttribute('src', 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@course_image.jpg');
  });

  it('renders organization logo with correct src and fallback', () => {
    renderComponent();

    const logo = screen.getByAltText('edX');
    expect(logo).toHaveAttribute('src', 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@org_image.jpg');
  });

  it('formats the link destination correctly', () => {
    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course/about');
  });

  it('handles missing start date gracefully', () => {
    const courseWithoutStart = {
      ...mockCourse,
      data: {
        ...mockCourse.data,
        start: '',
      },
    };
    renderComponent(courseWithoutStart);

    expect(screen.getByText('Starts:')).toBeInTheDocument();
  });
});
