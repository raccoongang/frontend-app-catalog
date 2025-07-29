import { render, screen } from '@src/setupTest';
import messages from '../../messages';
import { ALERT_VARIANTS } from '../../constants';
import { EnrolledStatus } from '../EnrolledStatus';

describe('EnrolledStatus', () => {
  const defaultProps = {
    showCoursewareLink: false,
    courseId: 'test-course-123',
  };

  it('renders enrollment success alert', () => {
    render(<EnrolledStatus {...defaultProps} />);
    expect(screen.getByText(messages.statusAlertEnrolled.defaultMessage)).toBeInTheDocument();
  });

  it('does not render courseware link button when showCoursewareLink is false', () => {
    render(<EnrolledStatus {...defaultProps} />);
    expect(screen.queryByText(messages.viewCourseBtn.defaultMessage)).not.toBeInTheDocument();
  });

  it('renders courseware link button when showCoursewareLink is true', () => {
    render(<EnrolledStatus {...defaultProps} showCoursewareLink />);

    const button = screen.getByRole('link', { name: messages.viewCourseBtn.defaultMessage });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', expect.stringContaining(defaultProps.courseId));
  });

  it('renders alert with success variant', () => {
    render(<EnrolledStatus {...defaultProps} />);

    const alert = screen.getByRole('alert');
    expect(alert.closest('div')).toHaveClass(`alert-${ALERT_VARIANTS.SUCCESS}`);
  });

  it('renders both alert and button when showCoursewareLink is true', () => {
    render(<EnrolledStatus {...defaultProps} showCoursewareLink />);

    expect(screen.getByText(messages.statusAlertEnrolled.defaultMessage)).toBeInTheDocument();

    const button = screen.getByRole('link', { name: messages.viewCourseBtn.defaultMessage });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', expect.stringContaining(defaultProps.courseId));
  });
});
