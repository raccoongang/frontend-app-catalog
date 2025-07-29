import { getConfig } from '@edx/frontend-platform';

import courseImagePlaceholder from '@src/assets/images/no-course-image.svg';

import {
  fireEvent, userEvent, render, screen,
} from '@src/setupTest';
import { extractYouTubeVideoId, getMediaUris } from '../utils';
import CourseMedia from '../CourseMedia';
import messages from '../messages';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

jest.mock('../utils', () => ({
  extractYouTubeVideoId: jest.fn(),
  getMediaUris: jest.fn(),
}));

describe('CourseMedia', () => {
  const mockCourseData = {
    name: 'Test Course',
    media: {
      courseImage: { uri: '/test-image.jpg' },
      courseVideo: { uri: 'https://youtube.com/watch?v=test123' },
    },
  };

  const defaultProps = {
    courseAboutData: mockCourseData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getConfig as jest.Mock).mockReturnValue({ LMS_BASE_URL: 'http://test-lms.com' });
    (getMediaUris as jest.Mock).mockReturnValue({
      imageUrl: '/test-image.jpg',
      videoUrl: 'https://youtube.com/watch?v=test123',
    });
    (extractYouTubeVideoId as jest.Mock).mockReturnValue('test123');
  });

  it('renders course image with correct attributes', () => {
    render(<CourseMedia {...defaultProps} />);

    const image = screen.getByAltText(mockCourseData.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://test-lms.com/test-image.jpg');
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
    (getMediaUris as jest.Mock).mockReturnValue({
      imageUrl: '/test-image.jpg',
      videoUrl: null,
    });
    (extractYouTubeVideoId as jest.Mock).mockReturnValue(null);

    render(<CourseMedia {...defaultProps} />);

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
    (getMediaUris as jest.Mock).mockReturnValue({
      imageUrl: null,
      videoUrl: null,
    });

    render(<CourseMedia {...defaultProps} />);

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
    expect(image).toHaveAttribute('src', 'http://test-lms.com/test-image.jpg');
  });
});
