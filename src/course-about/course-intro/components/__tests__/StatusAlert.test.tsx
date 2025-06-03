import { render, within } from '../../../../setupTest';
import { ALERT_VARIANTS } from '../../constants';
import { StatusAlert } from '../StatusAlert';

import messages from '../../messages';

const renderStatusAlert = (variant: typeof ALERT_VARIANTS[keyof typeof ALERT_VARIANTS], messageKey: string) => render(
  <StatusAlert variant={variant} messageKey={messageKey} />,
);

describe('StatusAlert', () => {
  it('renders with success variant and correct message', () => {
    const { getByRole } = renderStatusAlert(ALERT_VARIANTS.SUCCESS, 'statusAlertEnrolled');

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-success');
    expect(within(alert).getByText(messages.statusAlertEnrolled.defaultMessage)).toBeInTheDocument();
  });

  it('renders with info variant and correct message', () => {
    const { getByRole } = renderStatusAlert(ALERT_VARIANTS.INFO, 'statusAlertFull');

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-info');
    expect(within(alert).getByText(messages.statusAlertFull.defaultMessage)).toBeInTheDocument();
  });

  it('renders with danger variant and correct message', () => {
    const { getByRole } = renderStatusAlert(ALERT_VARIANTS.DANGER, 'statusAlertEnrolled');

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-danger');
    expect(within(alert).getByText(messages.statusAlertEnrolled.defaultMessage)).toBeInTheDocument();
  });
});
