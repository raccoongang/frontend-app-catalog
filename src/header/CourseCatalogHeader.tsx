import Header from '@edx/frontend-component-header';
import { getConfig, ensureConfig } from '@edx/frontend-platform';

import { useMenuItems } from './hooks/useMenuItems';
import { REQUIRED_CONFIG } from './constants';

ensureConfig(REQUIRED_CONFIG, 'Header');

const CourseCatalogHeader = () => {
  const { mainMenu, secondaryMenu, isNotHomePage } = useMenuItems();

  return (
    <Header
      mainMenuItems={mainMenu}
      logoDestination={isNotHomePage ? `${getConfig().LMS_BASE_URL}/dashboard` : getConfig().LMS_BASE_URL}
      secondaryMenuItems={secondaryMenu}
    />
  );
};

export default CourseCatalogHeader;
