import { getConfig } from '@edx/frontend-platform';

import { ROUTES } from '@src/routes';
import { mockCourseResponse } from '@src/__mocks__';
import { render, screen } from '@src/setupTest';
import { CourseCard } from '.';

import messages from './messages';

describe('CourseCard', () => {
  const renderComponent = (course = mockCourseResponse) => render(
    <CourseCard course={course} />,
  );

  it('renders course information correctly', () => {
    renderComponent();

    expect(screen.getByText(mockCourseResponse.data.content.displayName)).toBeInTheDocument();
    expect(screen.getByText(mockCourseResponse.data.org)).toBeInTheDocument();
    expect(screen.getByText(mockCourseResponse.data.number)).toBeInTheDocument();
    expect(screen.getByText('Starts: Apr 1, 2024')).toBeInTheDocument();
  });

  it('renders course image with correct src and fallback', () => {
    renderComponent();

    const image = screen.getByAltText(`${mockCourseResponse.data.content.displayName} ${mockCourseResponse.data.number}`);
    expect(image).toHaveAttribute('src', `${getConfig().LMS_BASE_URL}${mockCourseResponse.data.imageUrl}`);
  });

  it('renders organization logo with correct src and fallback', () => {
    renderComponent();

    const logo = screen.getByAltText(mockCourseResponse.data.org);
    expect(logo).toHaveAttribute('src', `${getConfig().LMS_BASE_URL}${mockCourseResponse.data.orgImg}`);
  });

  it('formats the link destination correctly', () => {
    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', ROUTES.COURSE_ABOUT.replace(':courseId', mockCourseResponse.id));
  });

  it('handles missing start date gracefully', () => {
    const courseWithoutStart = {
      ...mockCourseResponse,
      data: {
        ...mockCourseResponse.data,
        start: '',
      },
    };
    renderComponent(courseWithoutStart);

    expect(screen.queryByText(messages.startDate.defaultMessage.replace('{startDate}', courseWithoutStart.data.start))).not.toBeInTheDocument();
  });
});
