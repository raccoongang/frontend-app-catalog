import { Card } from '@openedx/paragon';

import SidebarSocial from './SidebarSocial';
import SidebarDetails from './sidebar-details/SidebarDetails';

const CourseSidebar = () => (
  <Card>
    <Card.Section>
      <SidebarSocial />
      <SidebarDetails />
    </Card.Section>
  </Card>
);

export default CourseSidebar;
