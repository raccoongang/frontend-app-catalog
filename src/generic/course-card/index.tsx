import { Card, useMediaQuery, breakpoints } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Link } from 'react-router-dom';
import { CourseCardProps } from './types';
import messages from './messages';
import { getFullImageUrl } from './utils';
import { DATE_FORMAT_OPTIONS } from './constants';

import noCourseImg from '../../assets/no-course-image.png';
import noOrgImg from '../../assets/no-org-image.png';

export const CourseCard = ({ course }: CourseCardProps) => {
  const intl = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  const formattedDate = course?.data?.start
    ? intl.formatDate(new Date(course.data.start), DATE_FORMAT_OPTIONS)
    : '';

  return (
    <Card
      as={Link}
      to={`/courses/${course.id}/about`}
      className={`course-card ${isExtraSmall ? 'w-100' : 'course-card-desktop'}`}
      isClickable
    >
      <Card.ImageCap
        src={getFullImageUrl(course.data.imageUrl)}
        fallbackSrc={noCourseImg}
        srcAlt={course.data.content.displayName}
        logoSrc={getFullImageUrl(course.data.orgImg)}
        fallbackLogoSrc={noOrgImg}
        logoAlt={course.data.org}
      />
      <Card.Header
        title={course.data.content.displayName}
        subtitle={course.data.org}
        className="mb-4.5"
      />
      {formattedDate && (
        <Card.Footer className="justify-content-start">
          {intl.formatMessage(messages.startDate, {
            startDate: formattedDate,
          })}
        </Card.Footer>
      )}
    </Card>
  );
};
