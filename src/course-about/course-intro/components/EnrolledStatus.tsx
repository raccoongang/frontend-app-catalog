import { Button } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { getLearningHomePageUrl } from '../utils';
import { EnrolledStatusTypes } from '../types';
import messages from '../messages';
import { ALERT_VARIANTS } from '../constants';
import { StatusAlert } from './StatusAlert';

export const EnrolledStatus = ({ showCoursewareLink, courseId }: EnrolledStatusTypes) => {
  const intl = useIntl();

  return (
    <>
      <StatusAlert
        variant={ALERT_VARIANTS.SUCCESS}
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
