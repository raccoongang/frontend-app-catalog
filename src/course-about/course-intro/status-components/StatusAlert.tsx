import { Alert } from '@openedx/paragon';
import { Info as InfoIcon, CheckCircle as CheckCircleIcon } from '@openedx/paragon/icons/es5';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { StatusAlertTypes } from '../types';

const StatusAlert = ({ variant, messageKey }: StatusAlertTypes) => {
  const intl = useIntl();

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return CheckCircleIcon;
      case 'info':
      case 'danger':
      default:
        return InfoIcon;
    }
  };

  return (
    <Alert
      className="course-about-intro-alert"
      variant={variant}
      icon={getIcon()}
    >
      <Alert.Heading>{intl.formatMessage(messages[messageKey])}</Alert.Heading>
    </Alert>
  );
};

export default StatusAlert;
