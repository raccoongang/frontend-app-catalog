import { Stack } from '@openedx/paragon';
import {
  CalendarMonth as CalendarMonthIcon,
  Info as InfoIcon,
  AccessTimeFilled as AccessTimeFilledIcon,
  MoneyFilled as MoneyFilledIcon,
} from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';

import { formatDate } from '../../../utils';
import SidebarDetailsItem from './SidebarDetailsItem';

const ENABLE_COSMETIC_DISPLAY_PRICE = true;

const SidebarDetails = ({ courseAboutData }) => {
  const renderSidebarDetails = () => {
    const details: JSX.Element[] = [];

    details.push(
      <SidebarDetailsItem
        key="effort"
        icon={AccessTimeFilledIcon}
        label="Course number"
        value={courseAboutData.displayNumberWithDefault}
      />,
    );

    if (!courseAboutData.startDateIsStillDefault) {
      const courseStartDate = courseAboutData.advertisedStart || courseAboutData.start;
      details.push(
        <SidebarDetailsItem
          key="start-date"
          icon={CalendarMonthIcon}
          label="Classes start"
          value={formatDate(courseStartDate)}
        />,
      );
    }

    if (courseAboutData.end) {
      const courseEndDate = courseAboutData.end;
      details.push(
        <SidebarDetailsItem
          key="end-date"
          icon={CalendarMonthIcon}
          label="Classes end"
          value={formatDate(courseEndDate)}
        />,
      );
    }

    if (courseAboutData.effort) {
      details.push(
        <SidebarDetailsItem
          key="effort"
          icon={AccessTimeFilledIcon}
          label="Estimated effort"
          value={courseAboutData.effort}
        />,
      );
    }

    if (courseAboutData.coursePrice && ENABLE_COSMETIC_DISPLAY_PRICE) {
      details.push(
        <SidebarDetailsItem
          key="price"
          icon={MoneyFilledIcon}
          label="Price"
          value={courseAboutData.coursePrice}
        />,
      );
    }

    if (courseAboutData.preRequisiteCourses.length) {
      details.push(
        <>
          <SidebarDetailsItem
            key="prerequisites"
            icon={InfoIcon}
            label="Prerequisites"
            value={(
              <a
                href={`${getConfig().LMS_BASE_URL}/courses/${courseAboutData.preRequisiteCourses[0].key}/about`}
              >
                {courseAboutData.preRequisiteCourses[0].display}
              </a>
            )}
          />
          <p>
            You must successfully complete
            {' '}
            <a
              href={`${getConfig().LMS_BASE_URL}/courses/${courseAboutData.preRequisiteCourses[0].key}/about`}
            >
              {courseAboutData.preRequisiteCourses[0].display}
            </a>
            {' '}
            before you begin this course.
          </p>
        </>,
      );
    }

    if (courseAboutData?.requirements) {
      details.push(
        <SidebarDetailsItem
          key="requirements"
          icon={InfoIcon}
          label="Requirements"
          value={courseAboutData.requirements}
        />,
      );
    }

    return details;
  };

  return (
    <Stack direction="vertical" gap={3}>
      {renderSidebarDetails()}
    </Stack>
  );
};

export default SidebarDetails;
