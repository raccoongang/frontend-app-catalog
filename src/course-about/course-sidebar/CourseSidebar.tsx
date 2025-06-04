import { Card } from '@openedx/paragon';

import SidebarSocial from './SidebarSocial';
import SidebarDetails from './sidebar-details/SidebarDetails';

const CourseSidebar = ({ courseAboutData }) => (
  <Card>
    <Card.Section>
      <SidebarSocial courseAboutData={courseAboutData} />
      <SidebarDetails courseAboutData={courseAboutData} />
    </Card.Section>
  </Card>
);

export default CourseSidebar;
