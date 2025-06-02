import { Button } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { EnrollmentButton } from '../status-components/EnrollmentButton';
import { EnrolledStatus } from '../status-components/EnrolledStatus';
import StatusAlert from '../status-components/StatusAlert';
import { getLearningHomePageUrl } from '../utils';
import messages from '../messages';
import { UseEnrollmentStatusTypes } from './types';

export const useEnrollmentStatus = ({
  courseAboutData,
  authenticatedUser,
  enrollmentError,
  isEnrollmentPending,
  handleChangeEnrollment,
  handleEcommerceCheckout,
}: UseEnrollmentStatusTypes) => {
  const intl = useIntl();
  const {
    id: courseId,
    allowAnonymous,
    isShibCourse,
    canEnroll,
    enrollment,
    isCourseFull,
    isInvitationOnly,
    showCoursewareLink,
    singlePaidMode,
    ecommerceCheckout,
  } = courseAboutData;

  const renderStatusContent = () => {
    if (enrollmentError) {
      return <StatusAlert variant="danger" messageKey="statusAlertEnrollmentError" />;
    }

    if (authenticatedUser && enrollment.isActive) {
      return <EnrolledStatus showCoursewareLink={showCoursewareLink} courseId={courseId} />;
    }

    if (isCourseFull) {
      return <StatusAlert variant="info" messageKey="statusAlertFull" />;
    }

    if (isInvitationOnly && !canEnroll) {
      return <StatusAlert variant="info" messageKey="statusAlertEnrollmentInvitationOnly" />;
    }

    if (!isShibCourse && !canEnroll) {
      return <StatusAlert variant="info" messageKey="statusAlertEnrollmentClosed" />;
    }

    if (allowAnonymous && showCoursewareLink) {
      return (
        <Button as="a" href={getLearningHomePageUrl(courseId)}>
          {intl.formatMessage(messages.viewCourseBtn)}
        </Button>
      );
    }

    return (
      <EnrollmentButton
        singlePaidMode={singlePaidMode}
        ecommerceCheckout={ecommerceCheckout}
        isEnrollmentPending={isEnrollmentPending}
        onEnroll={handleChangeEnrollment}
        onEcommerceCheckout={handleEcommerceCheckout}
      />
    );
  };

  return { renderStatusContent };
};
