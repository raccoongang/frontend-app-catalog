import { Card } from '@openedx/paragon';

import { useFrontendParams } from '@src/data/frontend-params';
import SidebarSocial from './sidebar-social/SidebarSocial';
import SidebarDetails from './sidebar-details/SidebarDetails';
import { CourseAboutData } from '../types';

const CourseSidebar = ({ courseAboutData }: { courseAboutData: CourseAboutData }) => {
  const { data: frontendParams } = useFrontendParams();

  return (
    <Card className="course-sidebar">
      <Card.Section className="p-0">
        {frontendParams?.courseAboutShowSocialLinks && (
          <SidebarSocial courseAboutData={courseAboutData} />
        )}
        <SidebarDetails courseAboutData={courseAboutData} />
      </Card.Section>
    </Card>
  );
};

export default CourseSidebar;
