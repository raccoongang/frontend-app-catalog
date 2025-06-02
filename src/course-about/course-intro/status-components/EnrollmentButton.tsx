import { StatefulButton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import { EnrollmentButtonTypes } from '../types';

export const EnrollmentButton = ({
  singlePaidMode,
  ecommerceCheckout,
  isEnrollmentPending,
  onEnroll,
  onEcommerceCheckout,
}: EnrollmentButtonTypes) => {
  const intl = useIntl();

  return (
    <StatefulButton
      as="a"
      className={singlePaidMode ? 'add-to-cart' : 'register'}
      onClick={ecommerceCheckout ? onEcommerceCheckout : onEnroll}
      state={isEnrollmentPending ? 'pending' : 'default'}
      labels={{
        default: intl.formatMessage(messages.enrollNowBtn),
        pending: intl.formatMessage(messages.enrollNowBtnPending),
      }}
    />
  );
};
