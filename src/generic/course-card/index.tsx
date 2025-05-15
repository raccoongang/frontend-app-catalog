import {
  Card, useMediaQuery, breakpoints, Hyperlink,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { CourseCardProps } from './types';

import noCourseImg from '../../assets/no-course-image.png';

export const CourseCard = ({ course }: CourseCardProps) => {
  const intl = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  const formattedDate = course?.data?.start
    ? intl.formatDate(new Date(course.data.start), {
      month: 'short', day: 'numeric', year: 'numeric',
    })
    : '';

  return (
    <Card
      as={Hyperlink}
      destination={`${getConfig().LMS_BASE_URL}/courses/${course.id}/about`}
      style={{ width: isExtraSmall ? '100%' : '396px' }}
      isClickable
      className="course-card"
    >
      <Card.ImageCap
        src={`${getConfig().LMS_BASE_URL}${course.data.imageUrl}`}
        fallbackSrc={noCourseImg}
        srcAlt={course.data.content.displayName}
      />
      <Card.Header
        title={course.data.content.displayName}
        subtitle={course.data.org}
        className="mb-4.5"
      />
      <Card.Footer className="justify-content-start">
        Starts: {formattedDate}
      </Card.Footer>
    </Card>
  );
};
