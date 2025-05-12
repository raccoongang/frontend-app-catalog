import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <div
      className="container-fluid d-flex py-5 justify-content-center align-items-start text-center"
      data-testid="not-found-page"
    >
      <p className="my-0 py-5 text-muted" style={{ maxWidth: '32em' }}>
        {intl.formatMessage(messages.title)}
      </p>
    </div>
  );
};

export default NotFoundPage;
