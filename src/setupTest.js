import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { render as rtlRender, within } from '@testing-library/react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';

function render(ui) {
  const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <MemoryRouter>
      <IntlProvider locale="en">
        {children}
      </IntlProvider>
    </MemoryRouter>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper });
}

export {
  render,
  within,
};
