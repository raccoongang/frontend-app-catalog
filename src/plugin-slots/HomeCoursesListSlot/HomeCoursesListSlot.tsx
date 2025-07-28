import { PluginSlot } from '@openedx/frontend-plugin-framework';

import CoursesList from '@src/home/components/courses-list/CoursesList';

const HomeCoursesListSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.catalog.home_page.home_courses_list"
    idAliases={['home_courses-list']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <CoursesList />
  </PluginSlot>
);

export default HomeCoursesListSlot;
