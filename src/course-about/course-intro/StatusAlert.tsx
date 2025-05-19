import { Alert } from '@openedx/paragon';
import { Info as InfoIcon, CheckCircle as CheckCircleIcon } from '@openedx/paragon/icons/es5';

interface StatusAlertProps {
  variant: 'info' | 'success' | 'danger';
  heading: string;
}

const StatusAlert = ({ variant, heading }: StatusAlertProps) => {
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
      <Alert.Heading>{heading}</Alert.Heading>
    </Alert>
  );
};

export default StatusAlert;
