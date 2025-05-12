import { Alert as BaseAlert } from '@openedx/paragon';
import { Info as InfoIcon } from '@openedx/paragon/icons';

export const AlertNotification = () => (
  <BaseAlert variant="danger" dismissible icon={InfoIcon}>
    <BaseAlert.Heading>Some error</BaseAlert.Heading>
    <p>Error text</p>
  </BaseAlert>
);
