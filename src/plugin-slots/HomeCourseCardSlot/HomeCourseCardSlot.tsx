import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { CourseCard } from '@src/generic';
import { CourseCardProps } from '@src/generic/course-card/types';

const HomeCourseCardSlot = ({ original: courseData }: CourseCardProps) => (
  <PluginSlot
    id="org.openedx.frontend.catalog.home_page.home_course_card"
    idAliases={['home_course-card']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <CourseCard original={courseData} />
  </PluginSlot>
);

export default HomeCourseCardSlot;
