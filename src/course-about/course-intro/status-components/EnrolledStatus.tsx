import { Button } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { getLearningHomePageUrl } from '../utils';
import StatusAlert from './StatusAlert';
import messages from '../messages';
import { EnrolledStatusTypes } from '../types';

export const EnrolledStatus = ({ showCoursewareLink, courseId }: EnrolledStatusTypes) => {
  const intl = useIntl();

  return (
    <>
      <StatusAlert
        variant="success"
        messageKey="statusAlertEnrolled"
      />
      {showCoursewareLink && (
        <Button as="a" href={getLearningHomePageUrl(courseId)}>
          {intl.formatMessage(messages.viewCourseBtn)}
        </Button>
      )}
    </>
  );
};
