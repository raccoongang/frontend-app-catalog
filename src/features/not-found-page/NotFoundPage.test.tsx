import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import NotFoundPage from './NotFoundPage';
import messages from './messages';

const renderComponent = () => render(
  <IntlProvider locale="en">
    <NotFoundPage />
  </IntlProvider>,
);

describe('<NotFoundPage />', () => {
  it('render component correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText(messages.title.defaultMessage)).toBeInTheDocument();
  });
});
