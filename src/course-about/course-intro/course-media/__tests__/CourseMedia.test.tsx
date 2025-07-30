import { getConfig } from '@edx/frontend-platform';

import courseImagePlaceholder from '@src/assets/images/no-course-image.svg';

import {
  fireEvent, userEvent, render, screen,
} from '@src/setupTest';
import { mockCourseAboutResponse } from '@src/__mocks__';
import CourseMedia from '../CourseMedia';
import messages from '../messages';

describe('CourseMedia', () => {
  const mockCourseData = {
    name: mockCourseAboutResponse.name,
    media: mockCourseAboutResponse.media,
  };

  const defaultProps = {
    courseAboutData: mockCourseData,
  };

  it('renders course image with correct attributes', () => {
    render(<CourseMedia {...defaultProps} />);

    const image = screen.getByAltText(mockCourseData.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `${getConfig().LMS_BASE_URL}${mockCourseAboutResponse.media.courseImage.uri}`);
    expect(image).toHaveClass('course-media-image');
  });

  it('renders video thumbnail when video is available', () => {
    render(<CourseMedia {...defaultProps} />);

    const videoButton = screen.getByRole('button', {
      name: messages.playCourseIntroductionVideo.defaultMessage,
    });
    expect(videoButton).toBeInTheDocument();
    expect(videoButton).toHaveClass('course-media-video-thumbnail');
  });

  it('renders only image when no video is available', () => {
    const courseDataWithoutVideo = {
      ...mockCourseData,
      media: {
        ...mockCourseData.media,
        courseVideo: undefined,
      },
    };

    render(<CourseMedia courseAboutData={courseDataWithoutVideo} />);

    expect(screen.getByAltText(mockCourseData.name)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('opens video modal when clicking video thumbnail', async () => {
    const user = userEvent.setup();
    render(<CourseMedia {...defaultProps} />);

    const videoButton = screen.getByRole('button', {
      name: messages.playCourseIntroductionVideo.defaultMessage,
    });
    await user.click(videoButton);

    // Check if VideoModal is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('uses placeholder image when image fails to load', () => {
    render(<CourseMedia {...defaultProps} />);

    const image = screen.getByAltText(mockCourseData.name);
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', courseImagePlaceholder);
  });

  it('uses placeholder image when no image URL is provided', () => {
    const courseDataWithoutImage = {
      ...mockCourseData,
      media: {
        ...mockCourseData.media,
        courseImage: {
          uri: null,
        },
      },
    };

    render(<CourseMedia courseAboutData={courseDataWithoutImage} />);

    const image = screen.getByAltText(mockCourseData.name);
    expect(image).toHaveAttribute('src', courseImagePlaceholder);
  });

  it('renders play button icon when video is available', () => {
    render(<CourseMedia {...defaultProps} />);

    const playButton = screen.getByTestId('play-course-introduction-video-icon');
    expect(playButton).toHaveClass('course-media-play-btn');
  });

  it('constructs correct image URL with LMS base URL', () => {
    render(<CourseMedia {...defaultProps} />);

    const image = screen.getByAltText(mockCourseData.name);
    expect(image).toHaveAttribute('src', `${getConfig().LMS_BASE_URL}${mockCourseAboutResponse.media.courseImage.uri}`);
  });
});
